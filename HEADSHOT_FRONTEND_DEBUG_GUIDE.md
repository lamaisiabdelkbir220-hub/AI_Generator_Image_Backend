# 🐛 Headshot Frontend Debugging Guide

## 🚨 Current Issues

Based on your screenshots:

### Issue 1: "Failed to load headshot styles"
- **Symptom**: App shows error immediately when opening headshot screen
- **Backend**: `/api/headshots/config` returns **200 OK** (working fine)
- **Conclusion**: ❌ **Frontend is not parsing the response correctly**

### Issue 2: "Generate button hangs / No result"
- **Symptom**: Loading forever, no result displayed
- **Backend**: `/api/headshots/generate` returns **200 OK** with success message
- **Conclusion**: ❌ **Frontend is not handling the generate response**

---

## ✅ Backend Status: **WORKING**

The Vercel logs show:
```
✅ GET /api/headshots/config → 200 OK
✅ POST /api/headshots/generate → 200 OK
   "Headshot generated successfully for user 2. Cost: 5 credits, Processing time: 4s"
```

**The problem is in the Flutter app, not the backend.**

---

## 🔍 Debugging Steps for Frontend Developer

### Step 1: Test Backend Directly

Call this test endpoint:
```
GET https://your-backend.vercel.app/api/headshots/test-response
```

This will show you:
- Exact response format the backend returns
- Common frontend issues
- Debugging checklist

### Step 2: Debug Config Endpoint

```dart
Future<void> testConfigEndpoint() async {
  try {
    final response = await http.get(
      Uri.parse('https://your-backend.vercel.app/api/headshots/config'),
    );
    
    print('Status Code: ${response.statusCode}');
    print('Raw Response: ${response.body}');
    
    final jsonData = jsonDecode(response.body);
    print('Parsed JSON: $jsonData');
    
    // Check the structure
    print('Message: ${jsonData['message']}');
    print('StatusCode: ${jsonData['statusCode']}');
    print('Styles Count: ${jsonData['data']['styles'].length}');
    print('First Style: ${jsonData['data']['styles'][0]}');
    print('Aspect Ratios: ${jsonData['data']['aspectRatios']}');
    
  } catch (e) {
    print('ERROR: $e');
    print('ERROR Type: ${e.runtimeType}');
  }
}
```

### Step 3: Check Response Structure

The backend returns:
```json
{
  "message": "Headshot configuration retrieved",
  "data": {
    "styles": [
      {
        "id": "corporate",
        "name": "Corporate Headshot",
        "description": "...",
        "category": "business",
        "creditCost": 50,
        "isPremium": false
      }
    ],
    "aspectRatios": [
      {
        "ratio": "1:1",
        "resolution": "1024x1024",
        "displayName": "Square"
      }
    ]
  },
  "statusCode": 200
}
```

**Common Mistakes:**
- ❌ Checking `response.statusCode` instead of `jsonData['statusCode']`
- ❌ Not checking if `jsonData['data']` exists
- ❌ Trying to access `jsonData['styles']` instead of `jsonData['data']['styles']`
- ❌ Not handling null values

### Step 4: Debug Generate Endpoint

```dart
Future<void> testGenerateEndpoint() async {
  try {
    // IMPORTANT: Convert image to base64
    final imageFile = File('path/to/image.jpg');
    final bytes = await imageFile.readAsBytes();
    final base64Image = 'data:image/jpeg;base64,${base64Encode(bytes)}';
    
    print('Sending request...');
    print('Image length: ${base64Image.length}');
    
    final response = await http.post(
      Uri.parse('https://your-backend.vercel.app/api/headshots/generate'),
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'imageUrl': base64Image,  // Must be base64 string!
        'style': 'corporate',
        'aspectRatio': '1:1',
      }),
    ).timeout(Duration(seconds: 120)); // IMPORTANT: Set long timeout!
    
    print('Status Code: ${response.statusCode}');
    print('Raw Response: ${response.body}');
    
    final jsonData = jsonDecode(response.body);
    print('Parsed JSON: $jsonData');
    
    // Check success
    if (jsonData['statusCode'] == 200) {
      print('SUCCESS!');
      print('Headshot URL: ${jsonData['data']['url']}');
      print('Credits Used: ${jsonData['data']['creditsUsed']}');
      print('Remaining: ${jsonData['data']['remainingCredits']}');
    } else {
      print('FAILED: ${jsonData['message']}');
    }
    
  } catch (e) {
    print('ERROR: $e');
    print('ERROR Type: ${e.runtimeType}');
  }
}
```

---

## 🔥 Common Frontend Issues

### Issue 1: Response Parsing
```dart
// ❌ WRONG
final styles = jsonData['styles'];  // This will be null!

// ✅ CORRECT
final styles = jsonData['data']['styles'];
```

### Issue 2: Base64 Format
```dart
// ❌ WRONG - Sending raw bytes
'imageUrl': bytes

// ❌ WRONG - Missing prefix
'imageUrl': base64Encode(bytes)

// ✅ CORRECT - With data URI prefix
'imageUrl': 'data:image/jpeg;base64,${base64Encode(bytes)}'
```

### Issue 3: Timeout
```dart
// ❌ WRONG - Default timeout is 30 seconds
await http.post(url, body: body);

// ✅ CORRECT - Headshot generation takes 20-60 seconds
await http.post(url, body: body).timeout(Duration(seconds: 120));
```

### Issue 4: Status Code Check
```dart
// ❌ WRONG - Checking HTTP status
if (response.statusCode == 200) {
  // This will be true even for errors!
}

// ✅ CORRECT - Check response body statusCode
final jsonData = jsonDecode(response.body);
if (jsonData['statusCode'] == 200) {
  // Now you know it's actually successful
}
```

### Issue 5: Error Handling
```dart
// ❌ WRONG - No error handling
final url = jsonData['data']['url'];

// ✅ CORRECT - Check if data exists
if (jsonData['statusCode'] == 200 && jsonData['data'] != null) {
  final url = jsonData['data']['url'];
  if (url != null && url.isNotEmpty) {
    // Display image
    Image.network(url);
  }
} else {
  // Show error
  showError(jsonData['message']);
}
```

---

## 📝 Complete Working Example

```dart
class HeadshotService {
  final String baseUrl = 'https://your-backend.vercel.app';
  final String authToken;

  HeadshotService(this.authToken);

  // Load styles
  Future<HeadshotConfig?> loadConfig() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/api/headshots/config'),
      ).timeout(Duration(seconds: 30));

      print('Config Response: ${response.body}');

      final jsonData = jsonDecode(response.body);
      
      // Check statusCode in response body
      if (jsonData['statusCode'] != 200) {
        throw Exception(jsonData['message'] ?? 'Failed to load config');
      }

      // Parse data
      final data = jsonData['data'];
      if (data == null) {
        throw Exception('No data in response');
      }

      return HeadshotConfig(
        styles: (data['styles'] as List)
            .map((s) => HeadshotStyle.fromJson(s))
            .toList(),
        aspectRatios: (data['aspectRatios'] as List)
            .map((r) => AspectRatio.fromJson(r))
            .toList(),
      );

    } catch (e) {
      print('Error loading config: $e');
      return null;
    }
  }

  // Generate headshot
  Future<HeadshotResult?> generateHeadshot({
    required File imageFile,
    required String styleId,
    required String aspectRatio,
  }) async {
    try {
      // Convert to base64
      final bytes = await imageFile.readAsBytes();
      final base64Image = 'data:image/jpeg;base64,${base64Encode(bytes)}';

      print('Generating headshot...');

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
      ).timeout(Duration(seconds: 120)); // IMPORTANT: Long timeout!

      print('Generate Response: ${response.body}');

      final jsonData = jsonDecode(response.body);

      // Handle errors
      if (jsonData['statusCode'] != 200) {
        throw Exception(jsonData['message'] ?? 'Generation failed');
      }

      final data = jsonData['data'];
      if (data == null || data['url'] == null) {
        throw Exception('No result URL in response');
      }

      return HeadshotResult(
        url: data['url'],
        creditsUsed: data['creditsUsed'] ?? 0,
        remainingCredits: data['remainingCredits'] ?? 0,
        processingTime: data['processingTime'] ?? 0,
        styleName: data['style'] ?? '',
      );

    } on TimeoutException {
      print('Timeout - generation takes too long');
      throw Exception('Request timed out. Please try again.');
    } catch (e) {
      print('Error generating headshot: $e');
      throw Exception('Failed to generate headshot: $e');
    }
  }
}
```

---

## 🎯 Checklist for Frontend Developer

### Config Loading (GET /api/headshots/config)
- [ ] Add timeout of at least 30 seconds
- [ ] Print raw response body to console
- [ ] Check `jsonData['statusCode']` not `response.statusCode`
- [ ] Access styles via `jsonData['data']['styles']`
- [ ] Handle null/missing data gracefully
- [ ] Show user-friendly error if loading fails

### Headshot Generation (POST /api/headshots/generate)
- [ ] Convert image to base64 with `data:image/jpeg;base64,` prefix
- [ ] Add `Authorization: Bearer TOKEN` header
- [ ] Add `Content-Type: application/json` header
- [ ] Set timeout to **120 seconds** minimum
- [ ] Check `jsonData['statusCode']` not `response.statusCode`
- [ ] Access URL via `jsonData['data']['url']`
- [ ] Handle 401 (auth), 402 (credits), 400 (error), 500 (server)
- [ ] Show loading indicator during generation
- [ ] Display result image using `Image.network(url)`

---

## 🧪 Test Commands

```bash
# Test config endpoint
curl https://your-backend.vercel.app/api/headshots/config

# Test generate endpoint (with auth)
curl -X POST https://your-backend.vercel.app/api/headshots/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "data:image/jpeg;base64,/9j/4AAQ...",
    "style": "corporate",
    "aspectRatio": "1:1"
  }'

# Test debug endpoint
curl https://your-backend.vercel.app/api/headshots/test-response
```

---

## 📞 Next Steps

1. **Call `/api/headshots/test-response`** to see expected format
2. **Add print statements** to your Flutter code
3. **Check response parsing** - is `data.styles` accessible?
4. **Verify base64 format** - does it have the correct prefix?
5. **Increase timeout** - 120 seconds for generation
6. **Check status codes** - use `jsonData['statusCode']` not HTTP status

**The backend is working fine. The issue is 100% in the frontend response handling.**
