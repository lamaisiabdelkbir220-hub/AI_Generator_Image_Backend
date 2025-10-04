# 🗑️ Image Cleanup Implementation - Delete After 30 Minutes

## ✅ What Was Implemented

An automated system that deletes original user images from Firebase Storage **30 minutes after successful headshot generation**.

---

## 📁 Files Created

### 1. `lib/firebase-storage.ts`
Helper functions to delete images from Firebase Storage:
- `deleteImageFromFirebase()` - Deletes image by URL
- `imageExistsInFirebase()` - Checks if image exists

### 2. `lib/cleanup-images.ts`
Cleanup logic:
- `cleanupOldOriginalImages()` - Main cleanup function (deletes 30+ min old images)
- `cleanupFailedGeneration()` - Cleanup for failed generations

### 3. `app/api/cleanup/images/route.ts`
API endpoint for triggering cleanup:
- `GET /api/cleanup/images` - Called by cron job
- `POST /api/cleanup/images` - Manual cleanup for testing

### 4. `vercel.json`
Cron configuration:
- Runs cleanup every hour: `0 * * * *`

---

## 🔄 How It Works

```
1. User generates headshot successfully
   ↓
2. Original image URL saved in database (originalImageUrl field)
   ↓
3. Generated headshot URL saved in database (resultUrls field)
   ↓
4. Image sits in Firebase for 30 minutes
   ↓
5. CRON JOB runs every hour
   ↓
6. Finds all completed generations older than 30 minutes
   ↓
7. Deletes original images from Firebase Storage
   ↓
8. Sets originalImageUrl to NULL in database
   ↓
9. Generated headshot remains available (from GetImg.ai)
```

---

## ⚙️ Setup Instructions

### Step 1: Add Environment Variables

Add to your `.env` file:

```bash
# Optional: Secret to protect cron endpoint
CRON_SECRET=your-secret-key-here

# Firebase Admin (should already exist)
FIREBASE_SERVICE_ACCOUNT_BASE64=your-base64-encoded-service-account
```

### Step 2: Update Firebase Admin Initialization

Ensure `lib/firebase.ts` initializes storage:

```typescript
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project-id.appspot.com'  // ← Add this line
});
```

### Step 3: Deploy to Vercel

The `vercel.json` file will automatically configure the cron job when you deploy:

```bash
vercel --prod
```

Vercel will run `/api/cleanup/images` every hour automatically.

---

## 🧪 Testing

### Test Manual Cleanup:

```bash
# Call the cleanup endpoint manually
curl -X POST https://your-domain.com/api/cleanup/images \
  -H "Content-Type: application/json"
```

### Test With Authentication:

```bash
curl https://your-domain.com/api/cleanup/images \
  -H "Authorization: Bearer your-cron-secret"
```

### Expected Response:

```json
{
  "message": "Image cleanup completed successfully",
  "data": {
    "total": 15,
    "deleted": 14,
    "failed": 1,
    "timestamp": "2025-01-15T10:30:00.000Z"
  },
  "statusCode": 200
}
```

---

## 📊 What Gets Deleted

### Deleted: ✅
- Original user photos uploaded to Firebase (30+ minutes old)
- Only for **completed** generations
- Database field `originalImageUrl` set to NULL

### NOT Deleted: ❌
- Generated headshots from GetImg.ai (different URL/storage)
- Images from failed generations (cleaned immediately)
- Images less than 30 minutes old
- Any generation metadata in database

---

## 🔍 Monitoring

### Check Cleanup Logs:

In Vercel Dashboard:
1. Go to your project
2. Click "Deployments"
3. Select latest deployment
4. Click "Functions"
5. Find `/api/cleanup/images`
6. View execution logs

### Database Query to Check:

```sql
-- Count images waiting for cleanup
SELECT COUNT(*) 
FROM headshot_generations 
WHERE status = 'completed' 
  AND original_image_url IS NOT NULL
  AND updated_at < NOW() - INTERVAL '30 minutes';
```

---

## ⚠️ Important Notes

### 1. Firebase Storage Bucket
Make sure your Firebase Storage bucket is set in Firebase admin initialization:

```typescript
// lib/firebase.ts
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project.appspot.com'  // ← Must be set!
});
```

### 2. Firebase Storage Rules
Ensure your Firebase Storage rules allow server-side deletion:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow server (Firebase Admin) to delete
      allow delete: if request.auth != null || request.auth.token.admin == true;
    }
  }
}
```

### 3. Cron Job Frequency
Current setting: **Every hour** (`0 * * * *`)

You can adjust in `vercel.json`:
- Every 30 minutes: `*/30 * * * *`
- Every 2 hours: `0 */2 * * *`
- Every 6 hours: `0 */6 * * *`

### 4. Cost Optimization
With hourly cleanup:
- Images exist for 30-90 minutes maximum
- Minimal storage costs
- No orphaned files

---

## 🚀 Alternative: Immediate Deletion

If you want to delete **immediately after success** instead of waiting 30 minutes:

### Update `app/api/headshots/generate/route.ts`:

```typescript
import { deleteImageFromFirebase } from '@/lib/firebase-storage';

// After successful generation
if (headshotResponse?.urls && headshotResponse.urls.length > 0) {
  
  // Update database with results
  await db.update(schema.headshotGenerations)
    .set({ 
      status: 'completed',
      resultUrls: headshotResponse.urls,
      processingTime,
      metadata: { ... }
    })
    .where(eq(schema.headshotGenerations.id, generation.id));

  // ✅ Delete original image immediately (don't wait 30 min)
  await deleteImageFromFirebase(data.imageUrl);
  
  // Clear URL from database
  await db.update(schema.headshotGenerations)
    .set({ originalImageUrl: null })
    .where(eq(schema.headshotGenerations.id, generation.id));
}
```

---

## 📋 Summary

| Feature | Implementation |
|---------|---------------|
| **Cleanup Trigger** | Cron job (hourly) |
| **Deletion Timing** | 30 minutes after success |
| **What's Deleted** | Original images from Firebase |
| **What's Kept** | Generated headshots, metadata |
| **Failed Generations** | Can be cleaned immediately |
| **Cost Impact** | Minimal storage costs |
| **Monitoring** | Vercel function logs |

**Your backend now automatically cleans up old images every hour!** 🎉