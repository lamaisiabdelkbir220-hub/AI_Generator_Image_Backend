# 📱 Headshot API Response Format for Frontend

## 🎯 Overview
After the recent update, the headshot generation endpoint now properly converts images to base64 before sending to GetImg.ai. Here's what the **app (frontend)** receives as a response.

---

## 📤 POST `/api/headshots/generate`

### Request Format
```typescript
{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",  // ✅ Base64 string (RECOMMENDED)
  // OR
  "imageUrl": "https://firebasestorage.googleapis.com/...",  // ⚠️ URL also supported
  "style": "corporate",                                       // Style ID
  "aspectRatio": "1:1"                                        // Aspect ratio
}
```

### 🎯 Image Input Options
The backend accepts **BOTH** formats:

1. **Base64 string** (RECOMMENDED) ✅
   - Format: `data:image/jpeg;base64,YOUR_BASE64_STRING`
   - No need to upload to Firebase first
   - Faster, more direct

2. **URL** (Also supported) ⚠️
   - Format: `https://...`
   - Backend will download and convert to base64
   - Adds extra step but still works

### Headers Required
```typescript
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

---

## ✅ Success Response (200)

```typescript
{
  "message": "Headshot generated successfully",
  "data": {
    "url": "https://cdn.getimg.ai/generated/xxx.jpg",  // ✅ Direct URL to generated headshot
    "creditsUsed": 50,                                  // Credits deducted
    "remainingCredits": 450,                            // Credits left after generation
    "processingTime": 25,                               // Time taken in seconds
    "style": "Corporate Headshot"                       // Human-readable style name
  },
  "statusCode": 200
}
```

### 🎨 How to Display in Flutter App:

```dart
// STEP 1: Convert image to base64 in Flutter
import 'dart:convert';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

Future<String> convertImageToBase64(File imageFile) async {
  final bytes = await imageFile.readAsBytes();
  return 'data:image/jpeg;base64,${base64Encode(bytes)}';
}

// STEP 2: Select image and convert
final picker = ImagePicker();
final pickedFile = await picker.pickImage(source: ImageSource.gallery);
if (pickedFile != null) {
  final imageFile = File(pickedFile.path);
  final base64Image = await convertImageToBase64(imageFile);
  
  // STEP 3: Send to backend
  final response = await generateHeadshot(base64Image, 'corporate', '1:1');
  
  // STEP 4: Display result
  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    
    // Get the generated headshot URL
    final headshotUrl = data['data']['url'];
    final creditsUsed = data['data']['creditsUsed'];
    final remainingCredits = data['data']['remainingCredits'];
    final processingTime = data['data']['processingTime'];
    
    // Display the image
    Image.network(headshotUrl);
    
    // Show success message
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('✨ Headshot Generated!'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.network(headshotUrl),
            SizedBox(height: 16),
            Text('Credits Used: $creditsUsed'),
            Text('Remaining: $remainingCredits'),
            Text('Processing Time: ${processingTime}s'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              // Download or share the image
              downloadImage(headshotUrl);
            },
            child: Text('Download'),
          ),
        ],
      ),
    );
  }
}
```

---

## ❌ Error Responses

### 1. Authentication Required (401)
```json
{
  "message": "Authentication required",
  "data": null,
  "statusCode": 401
}
```

**Action:** Redirect user to login

---

### 2. Insufficient Credits (402)
```json
{
  "message": "Insufficient credits",
  "data": {
    "required": 50,
    "available": 20,
    "shortfall": 30
  },
  "statusCode": 402
}
```

**Action:** Show "Buy Credits" screen with shortfall amount

---

### 3. Validation Failed (422)
```json
{
  "message": "Validation failed",
  "data": null,
  "statusCode": 422,
  "errors": [
    {
      "code": "invalid_type",
      "message": "Image URL is required",
      "path": ["imageUrl"]
    }
  ]
}
```

**Action:** Show validation error to user

---

### 4. Invalid Image URL (400)
```json
{
  "message": "Invalid image URL format",
  "data": null,
  "statusCode": 400
}
```

**Action:** Tell user to select a valid image

---

### 5. Generation Failed (400)
```json
{
  "message": "Headshot generation failed",
  "data": {
    "error": "parameter_invalid_base64 or other GetImg.ai error"
  },
  "statusCode": 400
}
```

**Action:** Show error message, suggest trying again

---

### 6. Server Error (500)
```json
{
  "message": "Unable to process headshot request at the moment.",
  "data": null,
  "statusCode": 500
}
```

**Action:** Show generic error, suggest trying again later

---

## 🔄 Complete Flutter Flow Example

```dart
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';

class HeadshotService {
  // Convert image file to base64
  Future<String> convertImageToBase64(File imageFile) async {
    final bytes = await imageFile.readAsBytes();
    return 'data:image/jpeg;base64,${base64Encode(bytes)}';
  }

  Future<HeadshotResult?> generateHeadshot({
    required String imageBase64,  // ✅ Now accepts base64
    required String style,
    required String aspectRatio,
    required String authToken,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('https://your-backend.vercel.app/api/headshots/generate'),
        headers: {
          'Authorization': 'Bearer $authToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'imageUrl': imageBase64,  // Send base64 string
          'style': style,
          'aspectRatio': aspectRatio,
        }),
      );

      final data = jsonDecode(response.body);

      // Handle different status codes
      switch (response.statusCode) {
        case 200:
          // ✅ Success
          return HeadshotResult(
            url: data['data']['url'],
            creditsUsed: data['data']['creditsUsed'],
            remainingCredits: data['data']['remainingCredits'],
            processingTime: data['data']['processingTime'],
            styleName: data['data']['style'],
          );

        case 401:
          // ❌ Not authenticated
          throw AuthException('Please log in again');

        case 402:
          // ❌ Insufficient credits
          throw InsufficientCreditsException(
            required: data['data']['required'],
            available: data['data']['available'],
            shortfall: data['data']['shortfall'],
          );

        case 400:
          // ❌ Bad request or generation failed
          throw HeadshotException(
            data['message'],
            details: data['data']?['error'],
          );

        case 422:
          // ❌ Validation error
          throw ValidationException(
            data['message'],
            errors: data['errors'],
          );

        case 500:
          // ❌ Server error
          throw ServerException('Server error. Please try again later.');

        default:
          throw Exception('Unexpected error: ${response.statusCode}');
      }
    } catch (e) {
      print('Error generating headshot: $e');
      rethrow;
    }
  }
}

// Model
class HeadshotResult {
  final String url;
  final int creditsUsed;
  final int remainingCredits;
  final int processingTime;
  final String styleName;

  HeadshotResult({
    required this.url,
    required this.creditsUsed,
    required this.remainingCredits,
    required this.processingTime,
    required this.styleName,
  });
}
```

---

## 📊 What Happens Behind the Scenes

### Option 1: Base64 Flow (RECOMMENDED) ✅
```
User Selects Image in App
        ↓
App Converts Image to Base64
        ↓
App Sends Base64 to Backend (/api/headshots/generate)
        ↓
Backend Sends Base64 to GetImg.ai
        ↓
GetImg.ai Generates Professional Headshot
        ↓
Backend Returns GetImg.ai URL to Frontend
        ↓
App Displays Generated Headshot ✨
```

### Option 2: URL Flow (Also Supported) ⚠️
```
User Uploads Image → Firebase Storage
        ↓
Gets Firebase URL
        ↓
App Sends URL to Backend
        ↓
Backend Downloads Image from URL
        ↓
Backend Converts to Base64
        ↓
Backend Sends Base64 to GetImg.ai
        ↓
GetImg.ai Generates Professional Headshot
        ↓
Backend Returns GetImg.ai URL to Frontend
        ↓
App Displays Generated Headshot ✨
```

**💡 Recommendation:** Use **Option 1 (Base64)** - it's faster and doesn't require Firebase upload!

---

## 🎯 Key Points for Frontend Developers

1. ✅ **Send base64, not URL** - Convert image to base64 in the app
2. ✅ **No Firebase upload needed** - Direct base64 transmission
3. ✅ **No history saved in V1** - Each generation is stateless
4. ✅ **Immediate response** - User gets the URL right away
5. ✅ **Download/Share immediately** - URL is valid and can be saved
6. ✅ **Check `statusCode`** in response body, not just HTTP status
7. ✅ **Handle all error cases** - 401, 402, 400, 422, 500
8. ✅ **Show remaining credits** - Display after each generation
9. ✅ **Processing time** - Can show loading indicator with estimated time

---

## 🚀 V2 Features (Future)

In the next version, we'll add:
- ❌ Generation history (`/api/headshots/history`)
- ❌ Favorites
- ❌ Multiple variations (batch mode)
- ❌ Status tracking for long-running jobs

But for **V1.0**, it's **simple and stateless** - just like image-to-image! 🎉

---

## 📝 Testing Checklist

### For Base64 Flow (Recommended)
- [ ] Select image from gallery/camera
- [ ] Convert image to base64 string
- [ ] Send base64 to backend
- [ ] Receive generated headshot URL
- [ ] Display image in app
- [ ] Download/share functionality works
- [ ] Credits are deducted correctly
- [ ] Error handling for all cases
- [ ] Loading indicator during processing
- [ ] Success message shows credits used

### For URL Flow (Also Works)
- [ ] Upload image to Firebase
- [ ] Get Firebase URL
- [ ] Send URL to backend
- [ ] Backend downloads and converts
- [ ] Receive generated headshot URL
- [ ] Display image in app
- [ ] All other checks same as above
