# 🎬 Headshot Generate API - Complete Response Examples

## 📤 Endpoint
```
POST /api/headshots/generate
```

---

## ✅ **SUCCESS Response (200)**

### Request:
```json
{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "style": "corporate",
  "aspectRatio": "1:1"
}
```

### Response:
```json
{
  "message": "Headshot generated successfully",
  "data": {
    "url": "https://cdn.getimg.ai/generated/img-u-abc123xyz.jpg",
    "creditsUsed": 5,
    "remainingCredits": 95,
    "processingTime": 28,
    "style": "Corporate"
  },
  "statusCode": 200
}
```

### HTTP Status: `200 OK`

### Field Descriptions:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `message` | string | Success message | `"Headshot generated successfully"` |
| `data.url` | string | Direct CDN URL to generated headshot | `"https://cdn.getimg.ai/generated/..."` |
| `data.creditsUsed` | number | Credits deducted for this generation | `5` |
| `data.remainingCredits` | number | User's credit balance after generation | `95` |
| `data.processingTime` | number | Time taken in seconds | `28` |
| `data.style` | string | Human-readable style name | `"Corporate"` |
| `statusCode` | number | Response status code | `200` |

### Flutter Usage:
```dart
if (response.statusCode == 200) {
  final jsonData = jsonDecode(response.body);
  
  if (jsonData['statusCode'] == 200) {
    final url = jsonData['data']['url'];
    final creditsUsed = jsonData['data']['creditsUsed'];
    final remainingCredits = jsonData['data']['remainingCredits'];
    final processingTime = jsonData['data']['processingTime'];
    final styleName = jsonData['data']['style'];
    
    // Display the generated headshot
    Image.network(url);
    
    // Update UI with remaining credits
    updateCreditsDisplay(remainingCredits);
    
    // Show success message
    showSuccessDialog(
      'Headshot generated in ${processingTime}s!\n'
      'Used $creditsUsed credits. $remainingCredits remaining.'
    );
  }
}
```

---

## ❌ **ERROR Responses**

---

### 1️⃣ **Authentication Required (401)**

```json
{
  "message": "Authentication required",
  "data": null,
  "statusCode": 401
}
```

### HTTP Status: `401 Unauthorized`

**Cause:** Missing or invalid Bearer token

**Flutter Action:**
```dart
if (jsonData['statusCode'] == 401) {
  // Redirect to login
  Navigator.pushReplacementNamed(context, '/login');
}
```

---

### 2️⃣ **Insufficient Credits (402)**

```json
{
  "message": "Insufficient credits",
  "data": {
    "required": 5,
    "available": 2,
    "shortfall": 3
  },
  "statusCode": 402
}
```

### HTTP Status: `402 Payment Required`

**Cause:** User doesn't have enough credits

**Flutter Action:**
```dart
if (jsonData['statusCode'] == 402) {
  final required = jsonData['data']['required'];
  final available = jsonData['data']['available'];
  final shortfall = jsonData['data']['shortfall'];
  
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text('Insufficient Credits'),
      content: Text(
        'You need $required credits but only have $available.\n'
        'Buy $shortfall more credits to continue.'
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
            Navigator.pushNamed(context, '/buy-credits');
          },
          child: Text('Buy Credits'),
        ),
      ],
    ),
  );
}
```

---

### 3️⃣ **Invalid Image URL Format (400)**

```json
{
  "message": "Invalid image URL format",
  "data": null,
  "statusCode": 400
}
```

### HTTP Status: `400 Bad Request`

**Cause:** Image URL is not valid base64 or URL format

**Common Issues:**
- Missing `data:image/jpeg;base64,` prefix
- Invalid base64 encoding
- Corrupted image data

**Flutter Action:**
```dart
if (jsonData['statusCode'] == 400 && 
    jsonData['message'].contains('Invalid image URL')) {
  showError('Please select a valid image and try again.');
}
```

---

### 4️⃣ **Validation Failed (422)**

```json
{
  "message": "Validation failed",
  "data": null,
  "statusCode": 422,
  "errors": [
    {
      "code": "invalid_type",
      "message": "Image URL or base64 required",
      "path": ["imageUrl"]
    }
  ]
}
```

### HTTP Status: `422 Unprocessable Entity`

**Cause:** Request body validation failed

**Common Issues:**
- Missing required field (`imageUrl`, `style`, `aspectRatio`)
- Wrong data type
- Empty values

**Flutter Action:**
```dart
if (jsonData['statusCode'] == 422) {
  final errors = jsonData['errors'] as List;
  final errorMessages = errors.map((e) => e['message']).join('\n');
  
  showError('Validation Error:\n$errorMessages');
}
```

---

### 5️⃣ **Invalid Headshot Style (400)**

```json
{
  "message": "Invalid headshot style",
  "data": null,
  "statusCode": 400
}
```

### HTTP Status: `400 Bad Request`

**Cause:** Style ID doesn't exist

**Valid Style IDs:**
- `corporate`
- `actor`
- `model`
- `executive`
- `creative`
- `lifestyle`
- `editorial`
- `cinematic`
- `environmental`

**Flutter Action:**
```dart
// Ensure you're using the style ID, not the name
final selectedStyleId = 'corporate'; // ✅ Correct
// NOT: final selectedStyleId = 'Corporate'; // ❌ Wrong
```

---

### 6️⃣ **Invalid Aspect Ratio (400)**

```json
{
  "message": "Invalid aspect ratio",
  "data": null,
  "statusCode": 400
}
```

### HTTP Status: `400 Bad Request`

**Cause:** Aspect ratio doesn't exist

**Valid Aspect Ratios:**
- `1:1` (Square - 1024x1024)
- `4:5` (Portrait - 832x1024)
- `3:4` (Classic - 768x1024)
- `16:9` (Wide - 1280x720)
- `9:16` (Vertical - 720x1280)

---

### 7️⃣ **Generation Failed (400)**

```json
{
  "message": "Headshot generation failed",
  "data": {
    "error": "parameter_invalid_base64"
  },
  "statusCode": 400
}
```

### HTTP Status: `400 Bad Request`

**Cause:** GetImg.ai service error

**Common Errors:**
- `parameter_invalid_base64` - Image not properly encoded
- `insufficient_balance` - Backend's GetImg.ai account out of credits
- `content_policy_violation` - Image contains inappropriate content
- `invalid_image` - Image corrupted or wrong format

**Flutter Action:**
```dart
if (jsonData['statusCode'] == 400 && 
    jsonData['message'] == 'Headshot generation failed') {
  final error = jsonData['data']['error'];
  
  if (error.contains('base64')) {
    showError('Invalid image format. Please select a different image.');
  } else if (error.contains('balance')) {
    showError('Service temporarily unavailable. Please try again later.');
  } else {
    showError('Generation failed: $error');
  }
}
```

---

### 8️⃣ **Server Error (500)**

```json
{
  "message": "Unable to process headshot request at the moment.",
  "data": null,
  "statusCode": 500
}
```

### HTTP Status: `500 Internal Server Error`

**Cause:** Unexpected server error

**Flutter Action:**
```dart
if (jsonData['statusCode'] == 500) {
  showError(
    'Server error. Please try again in a few moments.\n'
    'If the problem persists, contact support.'
  );
}
```

---

## 📊 **Complete Response Handling Example**

```dart
Future<HeadshotResult?> generateHeadshot({
  required File imageFile,
  required String styleId,
  required String aspectRatio,
  required String authToken,
}) async {
  try {
    // Convert to base64
    final bytes = await imageFile.readAsBytes();
    final base64Image = 'data:image/jpeg;base64,${base64Encode(bytes)}';
    
    // Send request
    final response = await http.post(
      Uri.parse('$baseUrl/api/headshots/generate'),
      headers: {
        'Authorization': 'Bearer $authToken',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'imageUrl': base64Image,
        'style': styleId,
        'aspectRatio': aspectRatio,
      }),
    ).timeout(Duration(seconds: 120));
    
    final jsonData = jsonDecode(response.body);
    
    // Handle response based on statusCode in body
    switch (jsonData['statusCode']) {
      case 200:
        // ✅ Success
        return HeadshotResult(
          url: jsonData['data']['url'],
          creditsUsed: jsonData['data']['creditsUsed'],
          remainingCredits: jsonData['data']['remainingCredits'],
          processingTime: jsonData['data']['processingTime'],
          styleName: jsonData['data']['style'],
        );
        
      case 401:
        // ❌ Not authenticated
        throw AuthException('Please log in again');
        
      case 402:
        // ❌ Insufficient credits
        throw InsufficientCreditsException(
          required: jsonData['data']['required'],
          available: jsonData['data']['available'],
          shortfall: jsonData['data']['shortfall'],
        );
        
      case 400:
        // ❌ Bad request or generation failed
        final message = jsonData['message'];
        final errorDetail = jsonData['data']?['error'];
        throw HeadshotException(message, details: errorDetail);
        
      case 422:
        // ❌ Validation error
        final errors = jsonData['errors'] as List;
        final errorMessages = errors.map((e) => e['message']).join(', ');
        throw ValidationException(errorMessages);
        
      case 500:
        // ❌ Server error
        throw ServerException('Server error. Please try again later.');
        
      default:
        throw Exception('Unexpected error: ${jsonData['message']}');
    }
    
  } on TimeoutException {
    throw TimeoutException('Request timed out. Generation takes 20-60 seconds.');
  } catch (e) {
    print('Error generating headshot: $e');
    rethrow;
  }
}
```

---

## 🔑 **Key Points**

1. ✅ **Always check `jsonData['statusCode']`** not `response.statusCode`
2. ✅ **Handle timeout** - Set 120 seconds minimum
3. ✅ **Use try-catch** - Network errors can happen
4. ✅ **Show user-friendly messages** - Don't expose technical errors
5. ✅ **Update credits immediately** - Use `remainingCredits` from response
6. ✅ **Display generated URL** - Use `Image.network(url)`
7. ✅ **Log errors** - Help with debugging

---

## 🧪 **Testing Scenarios**

### Test 1: Successful Generation
```
✅ Valid image, style, and aspect ratio
✅ User has enough credits (5+)
✅ Result: URL returned, credits deducted
```

### Test 2: Insufficient Credits
```
❌ User has 2 credits, needs 5
❌ Result: 402 error with shortfall details
```

### Test 3: Invalid Style
```
❌ Style ID: "invalid_style"
❌ Result: 400 error - Invalid headshot style
```

### Test 4: Bad Image Format
```
❌ Image without base64 prefix
❌ Result: 400 error - Invalid image URL format
```

### Test 5: No Authentication
```
❌ Missing Bearer token
❌ Result: 401 error - Authentication required
```

---

## 📋 **Response Summary Table**

| Status | Message | Data Fields | Action |
|--------|---------|-------------|--------|
| 200 | Success | url, creditsUsed, remainingCredits, processingTime, style | Display image |
| 401 | Auth required | null | Redirect to login |
| 402 | Insufficient credits | required, available, shortfall | Show buy credits |
| 400 | Invalid request | error (optional) | Show error, retry |
| 422 | Validation failed | errors array | Show validation errors |
| 500 | Server error | null | Show generic error |

---

**All responses follow the same structure for consistency!** 🎯
