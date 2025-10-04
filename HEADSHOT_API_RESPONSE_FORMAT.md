# 📱 Headshot API Response Format for Frontend

## 🎯 Overview
After the recent update, the headshot generation endpoint now properly converts images to base64 before sending to GetImg.ai. Here's what the **app (frontend)** receives as a response.

---

## 📤 POST `/api/headshots/generate`

### Request Format
```typescript
{
  "imageUrl": "https://firebasestorage.googleapis.com/...",  // Firebase URL
  "style": "corporate",                                       // Style ID
  "aspectRatio": "1:1"                                        // Aspect ratio
}
```

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
// Example Flutter code
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
class HeadshotService {
  Future<HeadshotResult?> generateHeadshot({
    required String imageUrl,
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
          'imageUrl': imageUrl,
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

```mermaid
User Uploads Image → Firebase Storage
                ↓
          Gets Firebase URL
                ↓
    Sends URL to Backend (/api/headshots/generate)
                ↓
  Backend Downloads Image from Firebase URL
                ↓
    Backend Converts Image to Base64
                ↓
     Backend Sends Base64 to GetImg.ai
                ↓
    GetImg.ai Generates Professional Headshot
                ↓
   Backend Returns GetImg.ai URL to Frontend
                ↓
      App Displays Generated Headshot ✨
```

---

## 🎯 Key Points for Frontend Developers

1. ✅ **No history saved in V1** - Each generation is stateless
2. ✅ **Immediate response** - User gets the URL right away
3. ✅ **Download/Share immediately** - URL is valid and can be saved
4. ✅ **Check `statusCode`** in response body, not just HTTP status
5. ✅ **Handle all error cases** - 401, 402, 400, 422, 500
6. ✅ **Show remaining credits** - Display after each generation
7. ✅ **Processing time** - Can show loading indicator with estimated time

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

- [ ] Upload image to Firebase
- [ ] Send Firebase URL to backend
- [ ] Receive generated headshot URL
- [ ] Display image in app
- [ ] Download/share functionality works
- [ ] Credits are deducted correctly
- [ ] Error handling for all cases
- [ ] Loading indicator during processing
- [ ] Success message shows credits used
