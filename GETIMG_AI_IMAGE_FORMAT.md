# 📸 How GetImg.ai Receives Images

## Answer: **Images are sent as URLs (NOT base64)**

Based on the implementation in your backend, **GetImg.ai accepts image URLs directly** in the API request.

---

## 🔍 Current Implementation

### Your Code (`lib/generate-headshot.ts`)

```typescript
const requestBody = {
  ...HEADSHOT_GEN_OPTIONS,
  prompt,
  negative_prompt: negativePrompt,
  image: params.imageUrl,  // ← URL is sent directly
  width,
  height,
  steps: getStepsForQuality(params.quality),
};
```

**What this means:**
- ✅ You send the image as a **URL string**
- ✅ GetImg.ai fetches the image from that URL
- ❌ No base64 encoding needed
- ❌ No file upload via multipart/form-data

---

## 📋 GetImg.ai API Specifications

### Endpoint Used:
```
POST https://api.getimg.ai/v1/stable-diffusion-xl/image-to-image
```

### Request Format:

```json
{
  "model": "stable-diffusion-xl-v1-0",
  "prompt": "Your detailed prompt here",
  "negative_prompt": "What you don't want",
  "image": "https://example.com/photo.jpg",  // ← URL format
  "width": 1024,
  "height": 1024,
  "steps": 40,
  "guidance": 7.5,
  "output_format": "jpeg",
  "scheduler": "euler",
  "response_format": "url"
}
```

---

## 🎯 Image Input Options with GetImg.ai

GetImg.ai supports **TWO methods** for providing images:

### Option 1: Public URL (Current Method) ✅

**How it works:**
- Image must be publicly accessible via HTTP/HTTPS
- GetImg.ai downloads the image from your URL
- No file size limits in the request

**Example:**
```typescript
{
  "image": "https://cdn.example.com/uploads/user-photo-123.jpg"
}
```

**Pros:**
- ✅ Simple implementation
- ✅ No encoding overhead
- ✅ Fast transmission
- ✅ Works with large images

**Cons:**
- ❌ Image must be publicly accessible
- ❌ Requires image hosting/CDN
- ❌ Potential latency if image is slow to download

---

### Option 2: Base64 Encoded String (Alternative)

**How it works:**
- Image is converted to base64 string
- Sent directly in the JSON payload
- No external URL needed

**Example:**
```typescript
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA..."
}
```

**Pros:**
- ✅ No need for public hosting
- ✅ More secure (no public URL exposure)
- ✅ Works with private images

**Cons:**
- ❌ Larger request payload
- ❌ Slower transmission for large images
- ❌ More processing overhead

---

## 🔄 Your Current Workflow

Here's how images flow in your headshot generation system:

### Client Side (Mobile App):
```
User uploads photo 
   ↓
Photo uploaded to cloud storage (Firebase/CDN)
   ↓
Public URL returned
   ↓
URL sent to your backend API
```

### Backend Side (Your API):
```
POST /api/headshots/generate
{
  "imageUrl": "https://storage.example.com/user-photo.jpg",
  "style": "corporate",
  "aspectRatio": "1:1"
}
   ↓
Backend validates URL
   ↓
Sends to GetImg.ai with URL
   ↓
GetImg.ai downloads image from URL
   ↓
Processes with AI
   ↓
Returns generated image URL
```

---

## 🛠️ Implementation Examples

### Current Implementation (URL Method):

```typescript
// Client uploads image to storage first
const uploadedUrl = await uploadToStorage(imageFile);

// Then sends URL to your API
const response = await fetch('/api/headshots/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    imageUrl: uploadedUrl,  // Public URL
    style: 'corporate',
    aspectRatio: '1:1'
  })
});
```

### Alternative Base64 Method (If needed):

```typescript
// Convert image to base64
function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

// Send base64 to backend
const base64Image = await imageToBase64(imageFile);

const response = await fetch('/api/headshots/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    imageBase64: base64Image,  // Base64 string
    style: 'corporate',
    aspectRatio: '1:1'
  })
});
```

---

## 📊 Comparison Table

| Feature | URL Method (Current) | Base64 Method |
|---------|---------------------|---------------|
| **Implementation** | ✅ Simple | ⚠️ Moderate |
| **Request Size** | ✅ Small | ❌ Large |
| **Speed** | ✅ Fast | ⚠️ Slower |
| **Security** | ⚠️ Public URL needed | ✅ No public URL |
| **Image Hosting** | ❌ Required | ✅ Not required |
| **Max File Size** | ✅ No practical limit | ⚠️ Limited by payload |

---

## 🎯 Recommendation

**Keep using the URL method** because:

1. ✅ **Already Implemented**: Your code is working perfectly
2. ✅ **Better Performance**: Smaller request payloads
3. ✅ **Scalable**: No size limitations
4. ✅ **Industry Standard**: Most AI APIs prefer URLs
5. ✅ **Caching**: GetImg.ai can cache downloaded images

**Only switch to base64 if:**
- You can't use public URLs
- Privacy concerns require it
- Image hosting is too expensive

---

## 🔐 Security Considerations

### Current URL Method:
```typescript
// Your validation
if (!isValidImageUrl(data.imageUrl)) {
  return Response.json({ 
    message: 'Invalid image URL format',
    statusCode: 400 
  });
}

// Ensure HTTPS only
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';  // Force HTTPS
  } catch {
    return false;
  }
}
```

**Best Practices:**
- ✅ Always use HTTPS URLs
- ✅ Validate URL format
- ✅ Use signed URLs with expiration
- ✅ Implement rate limiting
- ✅ Verify file type before upload

---

## 📝 Summary

**Question**: How do you send images to GetImg.ai?

**Answer**: As **public HTTPS URLs** - NOT base64 or file upload

**Current Flow**:
```
User Photo → Cloud Storage → Public URL → Your API → GetImg.ai
```

**API Request**:
```json
{
  "image": "https://your-cdn.com/photo.jpg",
  "prompt": "...",
  "style": "..."
}
```

Your implementation is correct and follows best practices! 🎉