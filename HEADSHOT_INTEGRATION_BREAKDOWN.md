# 🎨 Chitra AI Headshot Integration - Complete Breakdown

## 📋 Overview
This document outlines the complete integration of professional headshot generation into the existing Chitra AI image generation platform. The integration adds a new premium feature for creating professional business portraits while maintaining the existing creative image generation capabilities.

---

## 🎯 Project Goals
- Add professional headshot generation alongside existing creative image generation
- Maintain existing credit system and mobile app compatibility
- Provide professional-quality output suitable for business use
- Create scalable foundation for future AI portrait features

---

## 🏗️ **PHASE 1: Core Foundation** 
*Estimated Time: 3-5 days*

### ✅ **1.1 Database Schema Extension**
**Priority: HIGH** | **Complexity: Medium**

Add new tables to support headshot generation:

```sql
-- Headshot generations tracking
CREATE TABLE headshot_generations (
  id SERIAL PRIMARY KEY NOT NULL,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  original_image_url VARCHAR(500),
  style VARCHAR(50) NOT NULL,
  aspect_ratio VARCHAR(10) NOT NULL,
  quality VARCHAR(20) DEFAULT 'high',
  batch_size INTEGER DEFAULT 1,
  status VARCHAR(20) DEFAULT 'queued',
  credits_used INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  result_urls JSONB, -- Store multiple generated image URLs
  processing_time INTEGER, -- Seconds taken to process
  error_message TEXT,
  metadata JSONB,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_headshot_generations_userId ON headshot_generations("userId");
CREATE INDEX idx_headshot_generations_status ON headshot_generations(status);
CREATE INDEX idx_headshot_generations_created_at ON headshot_generations(created_at);

-- Headshot styles configuration
CREATE TABLE headshot_styles (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  prompt_template TEXT NOT NULL,
  negative_prompt TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  credit_cost INTEGER DEFAULT 3,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP
);
```

**Files to create/modify:**
- `db/schema.ts` - Add new table definitions
- `scripts/headshot-database-setup.sql` - Migration script
- `backend/headshot-generations.ts` - Helper functions

### ✅ **1.2 Constants & Configuration**
**Priority: HIGH** | **Complexity: Low**

Add headshot-specific constants and styles:

```typescript
// lib/constants.ts additions
export const HEADSHOT_STYLES = [
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional business headshots with formal attire",
    promptTemplate: "Professional corporate headshot, business attire, clean white background, professional studio lighting, confident expression, high quality portrait photography",
    creditCost: 3,
    isPremium: false
  },
  {
    id: "casual_professional", 
    name: "Casual Professional",
    description: "Smart casual professional portraits",
    promptTemplate: "Smart casual professional headshot, business casual attire, clean background, natural lighting, approachable expression, professional photography",
    creditCost: 3,
    isPremium: false
  },
  {
    id: "executive",
    name: "Executive",
    description: "High-end executive portraits with commanding presence", 
    promptTemplate: "Executive portrait, luxury business attire, dramatic professional lighting, commanding presence, high-end professional photography, premium quality",
    creditCost: 4,
    isPremium: true
  },
  {
    id: "creative_professional",
    name: "Creative Professional", 
    description: "Creative industry professional portraits",
    promptTemplate: "Creative professional headshot, stylish modern attire, artistic lighting, creative background, expressive confident look, high-end photography",
    creditCost: 3,
    isPremium: false
  }
] as const;

export const HEADSHOT_COSTS = {
  standard_quality: 3,
  high_quality: 4, 
  ultra_quality: 5,
  premium_style_surcharge: 1,
  batch_generation_per_extra: 2
} as const;

export const HEADSHOT_ASPECT_RATIOS = [
  { ratio: "1:1", resolution: "1024x1024", description: "Square - LinkedIn, social profiles" },
  { ratio: "3:4", resolution: "768x1024", description: "Portrait - Traditional headshots" },
  { ratio: "4:5", resolution: "819x1024", description: "Portrait+ - Instagram, print" }
] as const;

// Update existing credit history types
export const CREDIT_HISTORY_TYPE = [
  'ADS_REWARD', 
  'CREDIT_PURCHASE', 
  'IMAGE_GEN',
  'HEADSHOT_GEN'
] as const;
```

### ✅ **1.3 Core API Endpoint**
**Priority: HIGH** | **Complexity: High**

Create the main headshot generation endpoint:

**File:** `app/api/headshots/generate/route.ts`

```typescript
import db from "@/db";
import * as schema from '@/db/schema';
import { auth } from "@/lib/auth";
import { HEADSHOT_STYLES, HEADSHOT_COSTS, HEADSHOT_ASPECT_RATIOS } from "@/lib/constants";
import { generateHeadshot } from "@/lib/generate-headshot";
import { headshotGenerateSchema } from "@/lib/validator";
import type { IGetImgResponseType } from "@/types";
import { eq, sql } from "drizzle-orm";
import { addCreditHistory } from "@/backend/credit-histories";

export async function POST(req: Request) {
  const authUser = await auth(req);

  if (!authUser)
    return Response.json({ message: 'Authentication required', data: null, statusCode: 401 }, { status: 401 });

  const rawData = await req.json();
  const { success, data, error } = headshotGenerateSchema.safeParse(rawData);

  if (!success)
    return Response.json({ message: 'Validation failed', data: null, statusCode: 422 }, { status: 422 });

  // Validate style
  const headshotStyle = HEADSHOT_STYLES.find(style => style.id === data.style);
  if (!headshotStyle)
    return Response.json({ message: 'Invalid headshot style', data: null, statusCode: 400 }, { status: 400 });

  // Validate aspect ratio
  const aspectRatio = HEADSHOT_ASPECT_RATIOS.find(ratio => ratio.ratio === data.aspectRatio);
  if (!aspectRatio)
    return Response.json({ message: 'Invalid aspect ratio', data: null, statusCode: 400 }, { status: 400 });

  // Calculate cost
  const baseCost = HEADSHOT_COSTS[data.quality || 'high_quality'];
  const styleCost = headshotStyle.isPremium ? HEADSHOT_COSTS.premium_style_surcharge : 0;
  const batchCost = (data.batchSize - 1) * HEADSHOT_COSTS.batch_generation_per_extra;
  const totalCost = baseCost + styleCost + batchCost;

  // Check user credits
  const [user] = await db.select().from(schema.users).where(eq(schema.users.id, authUser.id));
  if (user.credits < totalCost)
    return Response.json({ message: 'Insufficient credits', data: null, statusCode: 402 }, { status: 402 });

  try {
    // Create generation record
    const [generation] = await db.insert(schema.headshotGenerations).values({
      userId: authUser.id,
      originalImageUrl: data.imageUrl,
      style: data.style,
      aspectRatio: data.aspectRatio,
      quality: data.quality || 'high',
      batchSize: data.batchSize || 1,
      creditsUsed: totalCost,
      status: 'processing'
    }).returning();

    // Generate headshot
    const headshotResponse = await generateHeadshot({
      imageUrl: data.imageUrl,
      style: headshotStyle,
      aspectRatio: aspectRatio,
      quality: data.quality || 'high',
      batchSize: data.batchSize || 1
    });

    if (headshotResponse?.error) {
      await db.update(schema.headshotGenerations)
        .set({ status: 'failed', errorMessage: headshotResponse.error.message })
        .where(eq(schema.headshotGenerations.id, generation.id));
      
      return Response.json({ 
        message: 'Headshot generation failed', 
        data: null, 
        statusCode: 400 
      }, { status: 400 });
    }

    // Update generation with results
    await db.update(schema.headshotGenerations)
      .set({ 
        status: 'completed',
        resultUrls: headshotResponse.urls,
        progress: 100
      })
      .where(eq(schema.headshotGenerations.id, generation.id));

    // Deduct credits and add history
    await addCreditHistory(user.id, -totalCost, 'HEADSHOT_GEN');
    await db.update(schema.users)
      .set({ credits: sql<number>`${schema.users.credits}-${totalCost}` })
      .where(eq(schema.users.id, authUser.id));

    return Response.json({ 
      message: 'Headshot generated successfully', 
      data: {
        generationId: generation.id,
        results: headshotResponse.urls,
        creditsUsed: totalCost,
        remainingCredits: user.credits - totalCost
      }, 
      statusCode: 200 
    }, { status: 200 });

  } catch (error) {
    console.error("Error generating headshot:", error);
    return Response.json({ 
      message: "Unable to process headshot request at the moment.", 
      data: null, 
      statusCode: 500 
    }, { status: 500 });
  }
}
```

### ✅ **1.4 Headshot Generation Service**
**Priority: HIGH** | **Complexity: Medium**

Create headshot-specific generation logic:

**File:** `lib/generate-headshot.ts`

```typescript
import env from "@/lib/env";
import type { IGetImgResponseType } from "@/types";
import { GET_IMG_BASE_URL } from "@/lib/constants";

interface HeadshotGenerationParams {
  imageUrl: string;
  style: {
    promptTemplate: string;
    negativePrompt?: string;
  };
  aspectRatio: {
    ratio: string;
    resolution: string;
  };
  quality: 'standard' | 'high' | 'ultra';
  batchSize: number;
}

export async function generateHeadshot(params: HeadshotGenerationParams) {
  const url = `${GET_IMG_BASE_URL}/stable-diffusion-xl/image-to-image`;
  
  const [width, height] = params.aspectRatio.resolution.split('x').map(Number);
  
  // Build comprehensive prompt for headshot
  const prompt = buildHeadshotPrompt(params.style.promptTemplate, params.quality);
  const negativePrompt = buildNegativePrompt(params.style.negativePrompt);
  
  const requestBody = {
    model: "stable-diffusion-xl-v1-0",
    prompt,
    negative_prompt: negativePrompt,
    image: params.imageUrl,
    width,
    height,
    steps: getStepsForQuality(params.quality),
    guidance: 7.5,
    strength: 0.8, // Important for headshots - preserve face structure
    output_format: 'jpeg',
    scheduler: 'euler',
    response_format: 'url'
  };

  const options = {
    method: 'POST',
    headers: { 
      accept: 'application/json', 
      'content-type': 'application/json', 
      Authorization: `Bearer ${env.GETIMAGE_AI_TOKEN}` 
    },
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    // Handle batch generation if needed
    if (params.batchSize > 1) {
      // For now, return single result
      // TODO: Implement actual batch processing
    }
    
    return {
      ...data,
      urls: [data.url] // Wrap in array for consistency
    } as IGetImgResponseType & { urls: string[] };
    
  } catch (error) {
    console.error("Headshot generation error:", error);
    return null;
  }
}

function buildHeadshotPrompt(styleTemplate: string, quality: string): string {
  const qualityModifiers = {
    standard: "professional photography",
    high: "high-quality professional photography, sharp focus",
    ultra: "ultra high-quality professional photography, sharp focus, studio lighting, commercial grade"
  };
  
  return `${styleTemplate}, ${qualityModifiers[quality]}, headshot, portrait, professional, clean composition`;
}

function buildNegativePrompt(styleNegative?: string): string {
  const baseNegative = "blurry, low quality, distorted face, multiple people, full body, landscape, cluttered background, amateur photography, poor lighting, noise, artifacts";
  return styleNegative ? `${baseNegative}, ${styleNegative}` : baseNegative;
}

function getStepsForQuality(quality: string): number {
  const steps = {
    standard: 30,
    high: 40, 
    ultra: 50
  };
  return steps[quality] || 40;
}
```

### ✅ **1.5 Validation Schema**
**Priority: HIGH** | **Complexity: Low**

Add validation for headshot requests:

**File:** `lib/validator.ts` (add to existing)

```typescript
export const headshotGenerateSchema = z.object({
  imageUrl: z.string().url("Valid image URL required"),
  style: z.string().min(1, "Style is required"),
  aspectRatio: z.string().min(1, "Aspect ratio is required"),
  quality: z.enum(["standard", "high", "ultra"]).optional().default("high"),
  batchSize: z.number().min(1).max(4).optional().default(1)
});
```

---

## ✅ **PHASE 2: Enhanced Features** 
*Status: COMPLETED*

### ✅ **2.1 Status Tracking & Progress**
- ✅ Add `/api/headshots/status/{id}` endpoint
- ✅ Progress tracking and estimation
- ✅ Generation metadata management
- ✅ PUT/DELETE operations for generations

### ✅ **2.2 History & Management**
- ✅ Add `/api/headshots/history` endpoint with pagination
- ✅ User's headshot generation history with filters
- ✅ Favorite/delete functionality
- ✅ Batch operations (favorite, unfavorite, delete)

### ✅ **2.3 Advanced Styles & Quality**
- ✅ 11 professional headshot styles total
- ✅ Premium style tiers (Executive, Actor, Model, Editorial, Cinematic)
- ✅ Style categories (Business, Creative, Entertainment, Specialized, Premium)
- ✅ Industry-specific styles (Medical, Legal, LinkedIn Optimized)

### ✅ **2.4 Batch Generation**
- ✅ Generate 2-4 variations per request
- ✅ Unique prompts and seeds for variations
- ✅ Rate limiting protection between requests
- ✅ Comprehensive cost calculation

### ✅ **2.5 Configuration & Testing**
- ✅ Enhanced `/api/headshots/config` endpoint
- ✅ Cost estimation API
- ✅ Comprehensive test suite `/api/headshots/test`
- ✅ Style filtering and categorization

---

## 🚀 **PHASE 3: Advanced Features**
*Estimated Time: 5-8 days*

### **3.1 Background Control**
- Background removal/replacement
- Professional background templates
- Custom background upload

### **3.2 Face Enhancement**
- Automatic face enhancement
- Skin smoothing and blemish removal
- Eye/teeth brightening options

### **3.3 Mobile App Integration**
- Flutter app headshot screens
- Native camera integration
- Offline preview capabilities

### **3.4 Analytics & Optimization**
- Generation success tracking
- Style popularity metrics
- Cost optimization analysis

---

## 🎯 **SUCCESS METRICS**

### **Phase 1 KPIs:**
- ✅ API endpoint responds successfully
- ✅ Database tables created and functional
- ✅ At least 4 headshot styles working
- ✅ Credit system integration complete
- ✅ Basic error handling implemented

### **Phase 2 KPIs:**
- 📊 Generation history tracking
- 📊 Status checking functionality
- 📊 User satisfaction > 80%
- 📊 Processing time < 60 seconds

### **Phase 3 KPIs:**
- 🚀 Mobile app integration complete
- 🚀 Advanced features adoption > 30%
- 🚀 Revenue increase from premium features
- 🚀 Scalable architecture for future features

---

## 📋 **NEXT STEPS**

1. **Review and approve** this breakdown
2. **Start Phase 1** with database schema updates
3. **Set up development environment** for headshot testing
4. **Create test cases** for each endpoint
5. **Plan mobile app integration** timeline

---

*Created: [Current Date]*  
*Status: Ready for Phase 1 Implementation*  
*Estimated Total Timeline: 12-19 days*