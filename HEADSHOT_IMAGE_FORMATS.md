# 📸 Headshot Image Formats - URL & Base64 Support

## ✅ Both Formats Now Supported!

The headshot endpoint now accepts **BOTH** URL and base64 formats for the input image.

---

## 🎯 Supported Formats:

### 1. **URL Format** (Recommended) ✅

**Example:**
```json
{
  "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project/o/photo.jpg?alt=media",
  "style": "corporate",
  "aspectRatio": "1:1"
}
```

**Pros:**
- ✅ Smaller request payload
- ✅ Faster transmission
- ✅ Works with large images
- ✅ Can be reused multiple times

**Cons:**
- ❌ Image must be publicly accessible
- ❌ Requires cloud storage/CDN

---

### 2. **Base64 Format** ✅

**Example:**
```json
{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "style": "corporate",
  "aspectRatio": "1:1"
}
```

**Pros:**
- ✅ No need for cloud storage
- ✅ More private (no public URL)
- ✅ Works with local images

**Cons:**
- ❌ Larger request payload (~33% bigger)
- ❌ Slower for large images
- ❌ Can't reuse URL later

---

## 📋 Format Detection:

The backend automatically detects which format you're using:

```typescript
export function isValidImageUrl(imageString: string): boolean {
  // Check if it's base64
  if (imageString.startsWith('data:image/')) {
    return true;  // ✅ Base64 format
  }
  
  // Check if it's URL
  try {
    const urlObj = new URL(imageString);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;  // ❌ Invalid format
  }
}
```

---

## 🔧 Implementation Examples:

### Option 1: URL Method (Recommended)

**Flutter/Dart:**
```dart
// 1. Upload to Firebase first
Future<String> uploadToFirebase(File imageFile) async {
  final ref = FirebaseStorage.instance
    .ref()
    .child('user_photos/${userId}_${DateTime.now().millisecondsSinceEpoch}.jpg');
  
  await ref.putFile(imageFile);
  final url = await ref.getDownloadURL();
  return url;
}

// 2. Send URL to backend
Future<String?> generateHeadshot(File imageFile) async {
  // Upload first
  final imageUrl = await uploadToFirebase(imageFile);
  
  // Then generate
  final response = await http.post(
    Uri.parse('$apiUrl/api/headshots/generate'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'imageUrl': imageUrl,  // ← URL from Firebase
      'style': 'corporate',
      'aspectRatio': '1:1',
    }),
  );
  
  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    return data['data']['url'];
  }
  return null;
}
```

---

### Option 2: Base64 Method

**Flutter/Dart:**
```dart
import 'dart:convert';
import 'dart:io';

// Convert image to base64
Future<String> imageToBase64(File imageFile) async {
  final bytes = await imageFile.readAsBytes();
  final base64String = base64Encode(bytes);
  
  // Add data URI prefix
  return 'data:image/jpeg;base64,$base64String';
}

// Send base64 directly
Future<String?> generateHeadshot(File imageFile) async {
  // Convert to base64
  final base64Image = await imageToBase64(imageFile);
  
  // Send directly (no cloud upload needed!)
  final response = await http.post(
    Uri.parse('$apiUrl/api/headshots/generate'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'imageUrl': base64Image,  // ← Base64 string
      'style': 'corporate',
      'aspectRatio': '1:1',
    }),
  );
  
  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    return data['data']['url'];
  }
  return null;
}
```

**JavaScript:**
```javascript
// Convert image to base64
async function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Generate headshot with base64
async function generateHeadshot(imageFile) {
  const base64Image = await imageToBase64(imageFile);
  
  const response = await fetch('/api/headshots/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageUrl: base64Image,  // Base64 string
      style: 'corporate',
      aspectRatio: '1:1',
    }),
  });
  
  const data = await response.json();
  return data.data.url;
}
```

---

## 📊 When to Use Each Format:

### Use URL Format When:
- ✅ You already have cloud storage (Firebase/S3)
- ✅ Image is large (>2 MB)
- ✅ You want faster requests
- ✅ You might regenerate with same image
- ✅ You need to share/reuse the URL

### Use Base64 Format When:
- ✅ You don't have cloud storage
- ✅ Image is small (<1 MB)
- ✅ Privacy is critical (no public URL)
- ✅ One-time use only
- ✅ Simpler implementation (no upload step)

---

## ⚠️ Important Considerations:

### Base64 Limitations:

**Size Increase:**
```
Original image: 1 MB
Base64 encoded: 1.33 MB (~33% larger)
```

**Request Size Limits:**
- Most APIs: ~10-50 MB max
- Your images should be <5 MB to be safe
- Compress images before base64 encoding

**Performance:**
```
URL Method:
- Upload: ~2 seconds
- API call: ~1 second (small payload)
- Total: ~3 seconds

Base64 Method:
- No upload: 0 seconds
- API call: ~3 seconds (large payload)
- Total: ~3 seconds

Similar performance for small images!
```

---

## 🧪 Testing Both Formats:

### Test 1: URL Format
```bash
curl -X POST https://your-api.com/api/headshots/generate \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://firebasestorage.googleapis.com/.../photo.jpg",
    "style": "corporate",
    "aspectRatio": "1:1"
  }'
```

### Test 2: Base64 Format
```bash
# First convert image to base64
BASE64_IMAGE=$(base64 -i photo.jpg)

curl -X POST https://your-api.com/api/headshots/generate \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d "{
    \"imageUrl\": \"data:image/jpeg;base64,$BASE64_IMAGE\",
    \"style\": \"corporate\",
    \"aspectRatio\": \"1:1\"
  }"
```

---

## 🔐 Security Notes:

### URL Format:
```typescript
// Best practice: Use signed URLs with expiration
const signedUrl = await storage.bucket().file(path).getSignedUrl({
  action: 'read',
  expires: Date.now() + 15 * 60 * 1000 // 15 minutes
});
```

### Base64 Format:
```typescript
// Validate file type before encoding
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
  throw new Error('Invalid file type');
}

// Limit file size before encoding
const maxSize = 10 * 1024 * 1024; // 10 MB
if (file.size > maxSize) {
  throw new Error('File too large');
}
```

---

## 📝 Validation Rules:

Both formats must pass these checks:

### URL Format:
- ✅ Must start with `http://` or `https://`
- ✅ Must be a valid URL structure
- ✅ Should be publicly accessible
- ✅ Should support CORS (if needed)

### Base64 Format:
- ✅ Must start with `data:image/`
- ✅ Must include valid base64 data
- ✅ Recommended: `data:image/jpeg;base64,...`
- ✅ Supported types: JPEG, PNG, WebP

---

## 💡 Recommendation:

**For Production:**
- Use **URL format** with Firebase Storage
- Implement cleanup after 30 minutes
- Use signed URLs for security
- Compress images before upload

**For Development/Testing:**
- Base64 is fine for quick testing
- No cloud setup needed
- Faster iteration

---

## 🎯 Summary:

| Feature | URL Format | Base64 Format |
|---------|-----------|---------------|
| **Supported** | ✅ Yes | ✅ Yes |
| **Request Size** | Small | Large (+33%) |
| **Setup Needed** | Cloud storage | None |
| **Privacy** | Public URL | Private |
| **Speed** | Fast | Slower for large images |
| **Recommended For** | Production | Development/Testing |

**Both work perfectly - choose based on your needs!** 🚀