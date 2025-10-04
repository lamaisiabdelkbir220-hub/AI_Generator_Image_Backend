# 🚀 Quick Setup Guide - Image Cleanup (30 Minutes Auto-Delete)

## ✅ Implementation Complete!

Your backend now automatically deletes original user images **30 minutes after successful headshot generation**.

---

## 📋 Setup Checklist

### Step 1: Update Firebase Admin Config ✅

Edit `lib/firebase.ts` and add the storage bucket:

```typescript
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project-id.appspot.com'  // ← Add this line
});
```

**Find your bucket name:**
- Go to Firebase Console → Storage
- Copy the bucket name (looks like: `project-name.appspot.com`)

---

### Step 2: Add Environment Variables ✅

Add to your `.env` file:

```bash
# Existing variables (should already be set)
FIREBASE_SERVICE_ACCOUNT_BASE64=your-base64-service-account

# New: Optional secret to protect cron endpoint
CRON_SECRET=your-random-secret-key-here
```

**Generate a random secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 3: Deploy to Vercel ✅

```bash
# Deploy to production
vercel --prod

# Vercel will automatically:
# - Read vercel.json
# - Setup cron job to run every hour
# - Call /api/cleanup/images automatically
```

---

## 🧪 Test the Implementation

### Test 1: Manual Cleanup

```bash
curl -X POST https://your-domain.com/api/cleanup/images
```

**Expected response:**
```json
{
  "message": "Manual cleanup completed",
  "data": {
    "total": 5,
    "deleted": 5,
    "failed": 0,
    "timestamp": "2025-01-15T10:30:00.000Z"
  }
}
```

---

### Test 2: With Authentication (if CRON_SECRET is set)

```bash
curl https://your-domain.com/api/cleanup/images \
  -H "Authorization: Bearer your-cron-secret"
```

---

### Test 3: Check Database

```sql
-- Before cleanup: See images waiting to be deleted
SELECT 
  id,
  user_id,
  original_image_url,
  status,
  updated_at,
  NOW() - updated_at as age
FROM headshot_generations
WHERE status = 'completed'
  AND original_image_url IS NOT NULL
  AND updated_at < NOW() - INTERVAL '30 minutes';

-- After cleanup: Should see NULL in original_image_url
SELECT 
  id,
  original_image_url,
  result_urls
FROM headshot_generations
WHERE status = 'completed'
  AND updated_at < NOW() - INTERVAL '30 minutes'
LIMIT 10;
```

---

## 📊 How to Monitor

### View Cron Job Logs in Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"** → Latest deployment
4. Click **"Functions"**
5. Find `/api/cleanup/images`
6. View execution logs

**You should see:**
```
Starting scheduled image cleanup...
Found 10 images to clean up
Deleted original image for generation 123
Deleted original image for generation 124
...
Cleanup completed: { total: 10, deleted: 10, failed: 0 }
```

---

## ⚙️ Configuration Options

### Change Cleanup Frequency

Edit `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cleanup/images",
      "schedule": "0 * * * *"  // ← Change this
    }
  ]
}
```

**Cron schedule examples:**
- `0 * * * *` - Every hour (current)
- `*/30 * * * *` - Every 30 minutes
- `0 */2 * * *` - Every 2 hours
- `0 */6 * * *` - Every 6 hours
- `0 0 * * *` - Once a day at midnight

---

### Change Deletion Timing

Edit `lib/cleanup-images.ts`:

```typescript
// Change from 30 minutes to 1 hour
const thirtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);

// Or 15 minutes
const thirtyMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
```

---

## 🔒 Security Best Practices

### 1. Protect the Cron Endpoint

Set `CRON_SECRET` environment variable:

```bash
# In Vercel Dashboard → Settings → Environment Variables
CRON_SECRET=your-secret-key
```

### 2. Firebase Storage Rules

Ensure server can delete files:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow authenticated users to upload
      allow write: if request.auth != null;
      
      // Allow server (Firebase Admin) to delete
      allow delete: if true;  // Server has full admin access
    }
  }
}
```

---

## 💰 Cost Impact

### Before Cleanup:
- Images accumulate forever
- Storage grows continuously
- Monthly cost increases

### After Cleanup:
- Images deleted after 30-90 minutes
- Minimal storage (only recent images)
- ~95% storage cost reduction!

**Example:**
- 1,000 users/month generating headshots
- Each photo ~2 MB
- **Before:** 2 GB/month accumulation = $0.05/month + growing
- **After:** ~20 MB average storage = $0.001/month (negligible!)

---

## ⚠️ Important Notes

### 1. Generated Headshots NOT Deleted
Only **original user photos** are deleted from Firebase. The **generated headshots from GetImg.ai** remain available via their URLs.

### 2. Failed Generations
You can also clean up failed generations immediately by calling:

```typescript
import { cleanupFailedGeneration } from '@/lib/cleanup-images';

// In your error handler
await cleanupFailedGeneration(generationId);
```

### 3. Database Fields
After cleanup:
- ✅ `result_urls` - Still contains generated headshot URLs
- ✅ `status` - Still shows "completed"
- ❌ `original_image_url` - Set to NULL

---

## 🎉 You're Done!

Your backend now automatically:
1. ✅ Deletes original images 30 minutes after generation
2. ✅ Runs cleanup every hour via cron job
3. ✅ Keeps generated headshots available
4. ✅ Saves ~95% storage costs
5. ✅ Improves user privacy

**No further action needed - it's fully automated!** 🚀