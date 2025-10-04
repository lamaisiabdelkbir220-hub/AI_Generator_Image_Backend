# 🚀 Headshot Feature Roadmap - Version 2.0

## 📋 Current Status: V1.0 (Stateless)

**V1.0 Implementation:**
- ✅ Stateless headshot generation (like image-to-image)
- ✅ No database storage
- ✅ Simple and fast
- ✅ Returns generated URL immediately
- ✅ User loses headshot if app closes

---

## 🎯 V2.0 Features - To Implement Later

### 1️⃣ User Experience Enhancements

#### 1.1 Generation History
**Priority:** 🔥 HIGH

**Description:**
- Save all headshot generations to database
- Show "My Headshots" screen in app
- Display thumbnails of past generations
- Allow users to view/download previous work

**Database Changes:**
```sql
-- Already exists in headshot_generations table
CREATE TABLE headshot_generations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  original_image_url VARCHAR(500),
  result_urls JSONB,
  style VARCHAR(50),
  status VARCHAR(20),
  created_at TIMESTAMP
);
```

**API Endpoints:**
```
GET /api/headshots/history         - List user's headshots
GET /api/headshots/history/{id}    - Get specific headshot
DELETE /api/headshots/history/{id} - Delete headshot
```

**Mobile App:**
- New "My Headshots" screen
- Grid/list view of past generations
- Tap to view full size
- Share/download options

---

#### 1.2 Favorites System
**Priority:** 🟡 MEDIUM

**Description:**
- Let users mark favorite headshots
- Filter view to show only favorites
- Quick access to best results

**Database Changes:**
```sql
-- Add to headshot_generations table
ALTER TABLE headshot_generations 
ADD COLUMN is_favorite BOOLEAN DEFAULT FALSE;
```

**API Endpoints:**
```
POST /api/headshots/{id}/favorite   - Mark as favorite
DELETE /api/headshots/{id}/favorite - Remove favorite
GET /api/headshots/favorites        - List favorites
```

---

#### 1.3 Processing Status Tracking
**Priority:** 🔥 HIGH

**Description:**
- Show real-time generation progress
- Display status: queued → processing → completed
- Handle failures gracefully

**Implementation:**
```typescript
// Status enum
status: 'queued' | 'processing' | 'completed' | 'failed'
progress: 0-100

// WebSocket or polling
GET /api/headshots/status/{id}
```

**Mobile App:**
- Loading indicator with percentage
- "Generation in progress..." message
- Notification when complete

---

#### 1.4 Retry Failed Generations
**Priority:** 🟡 MEDIUM

**Description:**
- Save failed generation attempts
- Allow user to retry without re-uploading
- Track error messages for support

**Implementation:**
```typescript
// In database
error_message: TEXT
retry_count: INTEGER

// API endpoint
POST /api/headshots/{id}/retry
```

---

### 2️⃣ Business Value Features

#### 2.1 Analytics Dashboard
**Priority:** 🟢 LOW

**Description:**
- Track which styles are most popular
- Monitor generation success rates
- User engagement metrics

**Metrics to Track:**
```typescript
- Total generations per style
- Success/failure rates
- Average processing time
- Peak usage times
- User retention (repeat generations)
```

**Implementation:**
```sql
CREATE TABLE headshot_analytics (
  id SERIAL PRIMARY KEY,
  style VARCHAR(50),
  total_generations INTEGER,
  success_rate DECIMAL(5,2),
  avg_processing_time INTEGER,
  date DATE
);
```

**Admin Dashboard:**
- Charts and graphs
- Style popularity
- User activity trends

---

#### 2.2 User Behavior Tracking
**Priority:** 🟢 LOW

**Description:**
- Track user journey
- Understand feature usage
- Identify drop-off points

**Events to Track:**
```typescript
- headshot_started
- headshot_completed
- headshot_downloaded
- style_selected
- generation_failed
- user_shared
```

---

#### 2.3 Generation Counter
**Priority:** 🟡 MEDIUM

**Description:**
- Show "You've generated X headshots"
- Display total credits spent
- Achievement system potential

**Database:**
```sql
-- Add to users table
ALTER TABLE users 
ADD COLUMN total_headshots_generated INTEGER DEFAULT 0;
```

---

### 3️⃣ Cost Tracking & Audit

#### 3.1 Detailed Credit History
**Priority:** 🔥 HIGH

**Description:**
- Link credit deductions to specific headshots
- Show what user paid for
- Enable refunds based on generation ID

**Database Changes:**
```sql
ALTER TABLE credit_histories
ADD COLUMN generation_id INTEGER REFERENCES headshot_generations(id);
```

**API:**
```
GET /api/credits/history?type=headshot
```

---

#### 3.2 Generation Metadata
**Priority:** 🟡 MEDIUM

**Description:**
- Save generation parameters
- Track processing time
- Store GetImg.ai costs

**Metadata Structure:**
```json
{
  "getimgCost": 0.02,
  "processingTime": 45,
  "modelUsed": "stable-diffusion-xl",
  "quality": "high",
  "attempts": 1
}
```

---

#### 3.3 Refund System
**Priority:** 🟡 MEDIUM

**Description:**
- Admins can issue refunds
- Link to specific generation
- Automatic credit restoration

**API:**
```
POST /api/admin/headshots/{id}/refund
```

---

### 4️⃣ Advanced Features

#### 4.1 Batch Generation
**Priority:** 🟢 LOW

**Description:**
- Generate multiple variations at once
- Try different styles simultaneously
- Compare results side-by-side

**Implementation:**
```typescript
POST /api/headshots/batch
{
  "imageUrl": "...",
  "styles": ["corporate", "creative", "model"],
  "aspectRatio": "1:1"
}
```

---

#### 4.2 Before/After Comparison
**Priority:** 🟢 LOW

**Description:**
- Save original photo reference
- Show side-by-side comparison
- Swipe to compare

---

#### 4.3 Share & Export
**Priority:** 🟡 MEDIUM

**Description:**
- Share to social media
- Export multiple formats
- Watermark options

---

#### 4.4 Auto-Cleanup (30-min deletion)
**Priority:** 🟡 MEDIUM

**Description:**
- Automatically delete original images after 30 minutes
- Save storage costs
- Better privacy

**Implementation:**
```typescript
// Already implemented in:
// - lib/cleanup-images.ts
// - app/api/cleanup/images/route.ts
// - vercel.json (cron job)
```

---

## 📅 Implementation Timeline

### Phase 1: Core History (1-2 weeks)
- ✅ Database structure (already done)
- 🔲 Save generations to DB
- 🔲 GET /api/headshots/history
- 🔲 Mobile app: "My Headshots" screen

### Phase 2: Status & Retry (1 week)
- 🔲 Processing status tracking
- 🔲 Retry failed generations
- 🔲 Error handling improvements

### Phase 3: Business Features (2-3 weeks)
- 🔲 Analytics dashboard
- 🔲 Credit history linking
- 🔲 Admin refund system

### Phase 4: Enhanced UX (1-2 weeks)
- 🔲 Favorites system
- 🔲 Share & export
- 🔲 Before/after comparison

### Phase 5: Optimization (1 week)
- 🔲 Auto-cleanup implementation
- 🔲 Batch generation
- 🔲 Performance improvements

---

## 🔧 Migration Plan: V1 → V2

### Step 1: Enable Database Saving
```typescript
// In /api/headshots/generate
// Add back the database insert
const [generation] = await db.insert(schema.headshotGenerations).values({
  userId: authUser.id,
  originalImageUrl: data.imageUrl,
  style: data.style,
  status: 'processing'
}).returning();
```

### Step 2: Add History Endpoint
```typescript
// app/api/headshots/history/route.ts
export async function GET(req: Request) {
  const authUser = await auth(req);
  
  const generations = await db
    .select()
    .from(schema.headshotGenerations)
    .where(eq(schema.headshotGenerations.userId, authUser.id))
    .orderBy(desc(schema.headshotGenerations.createdAt));
  
  return Response.json({ data: generations });
}
```

### Step 3: Update Mobile App
```dart
// Add "My Headshots" screen
class MyHeadshotsScreen extends StatelessWidget {
  // Fetch and display history
  // Grid view of thumbnails
  // Tap to view/download
}
```

### Step 4: Add Status Tracking
```typescript
// Enable real-time status updates
// Add progress field
// Implement polling or WebSocket
```

### Step 5: Deploy Analytics
```typescript
// Background job for analytics
// Admin dashboard
// Metrics tracking
```

---

## 💡 Quick Wins (Easy to Add First)

1. **Generation History** - Most valuable, users will love it
2. **Credit History Link** - Important for support
3. **Favorites** - Simple to add, high user value
4. **Processing Status** - Better UX during generation

---

## 🎯 Success Metrics

Track these to measure V2 success:

- **User Engagement**
  - % of users who view history
  - Average headshots per user
  - Favorite usage rate

- **Technical**
  - Generation success rate
  - Average processing time
  - Error rate reduction

- **Business**
  - User retention improvement
  - Support ticket reduction
  - Feature usage statistics

---

## 📝 Notes

- All database schema already exists from initial implementation
- Just need to enable saving in the API
- Mobile app changes are minimal
- Most work is in analytics/admin features
- Can implement gradually (feature flags)

**Remember:** Start with user-facing features first (history, favorites), then add business/admin features later!

---

## 🚀 When to Implement

**Trigger conditions:**
- ✅ V1 is stable and working
- ✅ Users requesting history feature
- ✅ Ready to invest 4-6 weeks development
- ✅ Analytics become important for business

**Don't implement if:**
- ❌ V1 is still buggy
- ❌ Users aren't using headshot feature
- ❌ Other features are higher priority
- ❌ Team is too small

---

**Last Updated:** January 2025  
**Status:** Planning / Not Started  
**Owner:** Development Team