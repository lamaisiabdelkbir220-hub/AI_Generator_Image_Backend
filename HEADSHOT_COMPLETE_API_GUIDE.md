# 📘 Complete Headshot API Guide - From Config to Generation to Results

## 🎯 Overview

This guide covers the **complete headshot workflow** from loading configuration to generating headshots to displaying results.

---

## 🔄 **Complete Workflow**

```
Step 1: Load Config → Step 2: Display UI → Step 3: Generate → Step 4: Display Result
```

---

# 📥 **Step 1: Get Configuration**

## Endpoint
```
GET /api/headshots/config
```

## Headers
```json
{
  "Content-Type": "application/json"
}
```

**Note:** No authentication required for config endpoint!

---

## ✅ **Backend Returns:**

```json
{
  "message": "Headshot configuration retrieved",
  "data": {
    "styles": [
      {
        "id": "corporate",
        "name": "Corporate",
        "description": "Professional business headshots with formal attire",
        "preview_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        "category": "business",
        "credit_cost": 3,
        "is_premium": false,
        "tags": ["business", "professional", "formal", "linkedin"]
      },
      {
        "id": "actor",
        "name": "Actor",
        "description": "Entertainment industry headshots for auditions",
        "preview_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        "category": "entertainment",
        "credit_cost": 4,
        "is_premium": true,
        "tags": ["acting", "audition", "casting", "entertainment"]
      },
      {
        "id": "model",
        "name": "Model",
        "description": "Fashion and commercial modeling portraits",
        "preview_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        "category": "entertainment",
        "credit_cost": 4,
        "is_premium": true,
        "tags": ["modeling", "fashion", "portfolio", "commercial"]
      }
      // ... 6 more styles (9 total)
    ],
    "categories": [
      {
        "id": "business",
        "name": "Business Professional",
        "description": "Corporate and business headshots",
        "icon": "💼"
      },
      {
        "id": "creative",
        "name": "Creative Professional",
        "description": "Artistic and creative portraits",
        "icon": "🎨"
      },
      {
        "id": "entertainment",
        "name": "Entertainment",
        "description": "Acting and modeling headshots",
        "icon": "🎭"
      },
      {
        "id": "lifestyle",
        "name": "Lifestyle",
        "description": "Natural and casual portraits",
        "icon": "🌿"
      },
      {
        "id": "specialized",
        "name": "Specialized",
        "description": "Industry-specific professional portraits",
        "icon": "⚡"
      },
      {
        "id": "premium",
        "name": "Premium",
        "description": "High-end professional portraits",
        "icon": "👔"
      }
    ],
    "aspectRatios": [
      {
        "ratio": "1:1",
        "resolution": "1024x1024",
        "displayName": "Square",
        "description": "Perfect for profile pictures",
        "icon": "⬜"
      },
      {
        "ratio": "4:5",
        "resolution": "832x1024",
        "displayName": "Portrait",
        "description": "Ideal for professional headshots",
        "icon": "📱"
      },
      {
        "ratio": "3:4",
        "resolution": "768x1024",
        "displayName": "Classic",
        "description": "Traditional portrait format",
        "icon": "🖼️"
      },
      {
        "ratio": "16:9",
        "resolution": "1280x720",
        "displayName": "Wide",
        "description": "Landscape orientation",
        "icon": "🖥️"
      },
      {
        "ratio": "9:16",
        "resolution": "720x1280",
        "displayName": "Vertical",
        "description": "Mobile-friendly vertical",
        "icon": "📲"
      }
    ],
    "qualityOptions": [
      {
        "level": "high",
        "credits": 50,
        "description": "High quality professional headshots",
        "estimatedTime": "45-60 seconds"
      }
    ],
    "costs": {
      "headshotGeneration": 50
    },
    "limits": {
      "batchSize": 1,
      "supportedFormats": ["JPEG", "PNG", "WEBP"],
      "maxFileSize": "10MB",
      "minResolution": "512x512"
    },
    "features": {
      "batchGeneration": false,
      "favoriteSystem": true,
      "historyTracking": true,
      "progressTracking": true,
      "premiumStyles": false
    },
    "styleCategories": {
      "business": 1,
      "creative": 1,
      "entertainment": 2,
      "lifestyle": 1,
      "specialized": 1,
      "premium": 3
    },
    "statistics": {
      "totalStyles": 9,
      "premiumStyles": 5,
      "basicStyles": 4
    }
  },
  "statusCode": 200
}
```

---

## 🎨 **Frontend Must Extract:**

```dart
class HeadshotConfig {
  final List<HeadshotStyle> styles;
  final List<AspectRatio> aspectRatios;
  final List<Category> categories;
  final int headshotCost;
  
  factory HeadshotConfig.fromJson(Map<String, dynamic> json) {
    final data = json['data'];
    
    return HeadshotConfig(
      styles: (data['styles'] as List)
          .map((s) => HeadshotStyle.fromJson(s))
          .toList(),
      aspectRatios: (data['aspectRatios'] as List)
          .map((r) => AspectRatio.fromJson(r))
          .toList(),
      categories: (data['categories'] as List)
          .map((c) => Category.fromJson(c))
          .toList(),
      headshotCost: data['costs']['headshotGeneration'],
    );
  }
}

class HeadshotStyle {
  final String id;               // ✅ REQUIRED - Send to API
  final String name;             // ✅ REQUIRED - Display title
  final String description;      // ✅ REQUIRED - Display subtitle
  final String previewUrl;       // ✅ REQUIRED - Show thumbnail
  final String category;         // ✅ OPTIONAL - Filter by category
  final int creditCost;          // ✅ OPTIONAL - Display cost
  final bool isPremium;          // ✅ OPTIONAL - Show premium badge
  final List<String> tags;       // ✅ OPTIONAL - Search/filter
  
  factory HeadshotStyle.fromJson(Map<String, dynamic> json) {
    return HeadshotStyle(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      previewUrl: json['preview_url'],
      category: json['category'],
      creditCost: json['credit_cost'],
      isPremium: json['is_premium'],
      tags: List<String>.from(json['tags'] ?? []),
    );
  }
}
```

---

# 🎬 **Step 2: Display UI**

## What to Show:

### 1. **Style Selection Grid**
```dart
GridView.builder(
  itemCount: styles.length,
  itemBuilder: (context, index) {
    final style = styles[index];
    return Card(
      child: Column(
        children: [
          // Preview Image
          Image.network(style.previewUrl),  // ✅ Use preview_url
          
          // Style Name
          Text(style.name),  // ✅ "Corporate", "Actor", etc.
          
          // Description
          Text(style.description, style: TextStyle(fontSize: 12)),
          
          // Premium Badge (if applicable)
          if (style.isPremium)
            Chip(label: Text('PREMIUM')),
          
          // Cost
          Text('${style.creditCost} credits'),
          
          // Select Button
          ElevatedButton(
            onPressed: () => selectStyle(style.id),
            child: Text('Select'),
          ),
        ],
      ),
    );
  },
)
```

### 2. **Aspect Ratio Selection**
```dart
Wrap(
  children: aspectRatios.map((ratio) {
    return ChoiceChip(
      label: Text(ratio.displayName),  // "Square", "Portrait"
      selected: selectedRatio == ratio.ratio,
      onSelected: (selected) {
        setState(() {
          selectedRatio = ratio.ratio;  // "1:1", "4:5"
        });
      },
    );
  }).toList(),
)
```

### 3. **Image Upload**
```dart
Future<void> selectImage() async {
  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);
  
  if (pickedFile != null) {
    final imageFile = File(pickedFile.path);
    
    // Convert to base64
    final bytes = await imageFile.readAsBytes();
    final base64Image = 'data:image/jpeg;base64,${base64Encode(bytes)}';
    
    setState(() {
      selectedImageBase64 = base64Image;
    });
  }
}
```

---

# 🚀 **Step 3: Generate Headshot**

## Endpoint
```
POST /api/headshots/generate
```

## Headers
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

---

## 📤 **Frontend Must Send:**

```json
{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQ...",
  "style": "corporate",
  "aspectRatio": "1:1"
}
```

### Field Details:

| Field | Type | Required | Format | Example |
|-------|------|----------|--------|---------|
| `imageUrl` | String | ✅ YES | Base64 with prefix | `data:image/jpeg;base64,/9j/4AAQ...` |
| `style` | String | ✅ YES | Style ID from config | `"corporate"`, `"actor"`, `"model"` |
| `aspectRatio` | String | ✅ YES | Ratio string | `"1:1"`, `"4:5"`, `"3:4"` |

---

## 🎯 **Important Notes:**

### 1. **Image Format**
```dart
// ✅ CORRECT - Base64 with data URI prefix
final base64Image = 'data:image/jpeg;base64,${base64Encode(bytes)}';

// ❌ WRONG - Raw base64 without prefix
final base64Image = base64Encode(bytes);

// ❌ WRONG - Firebase URL
final imageUrl = 'https://firebasestorage.googleapis.com/...';
```

### 2. **Timeout**
```dart
// ✅ CORRECT - Set long timeout
final response = await http.post(
  Uri.parse('$baseUrl/api/headshots/generate'),
  headers: headers,
  body: jsonEncode(requestBody),
).timeout(Duration(seconds: 120));  // ✅ 120 seconds minimum!
```

### 3. **Style ID**
```dart
// ✅ CORRECT - Use the ID from config
"style": "corporate"  // From style.id

// ❌ WRONG - Don't use the name
"style": "Corporate"  // Wrong!
```

---

## 📥 **Backend Returns on Success:**

```json
{
  "message": "Headshot generated successfully",
  "data": {
    "url": "https://cdn.getimg.ai/generated/img-abc123xyz.jpg",
    "creditsUsed": 50,
    "remainingCredits": 450,
    "processingTime": 25,
    "style": "Corporate Headshot"
  },
  "statusCode": 200
}
```

### Field Details:

| Field | Type | Description | Frontend Usage |
|-------|------|-------------|----------------|
| `url` | String | Generated headshot CDN URL | **Display with Image.network()** |
| `creditsUsed` | Integer | Credits deducted | Show in success message |
| `remainingCredits` | Integer | Credits left | Update user's credit balance |
| `processingTime` | Integer | Seconds taken | Show in success message |
| `style` | String | Human-readable style name | Show which style was used |

---

## ❌ **Error Responses:**

### 1. **Authentication Required (401)**
```json
{
  "message": "Authentication required",
  "data": null,
  "statusCode": 401
}
```
**Action:** Redirect to login

---

### 2. **Insufficient Credits (402)**
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

### 3. **Validation Failed (422)**
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
**Action:** Show validation error to user

---

### 4. **Invalid Image URL (400)**
```json
{
  "message": "Invalid image URL format",
  "data": null,
  "statusCode": 400
}
```
**Action:** Tell user to select a valid image

---

### 5. **Generation Failed (400)**
```json
{
  "message": "Headshot generation failed",
  "data": {
    "error": "parameter_invalid_base64"
  },
  "statusCode": 400
}
```
**Action:** Show error, suggest trying again

---

### 6. **Server Error (500)**
```json
{
  "message": "Unable to process headshot request at the moment.",
  "data": null,
  "statusCode": 500
}
```
**Action:** Show generic error, try again later

---

# 🎨 **Step 4: Display Result**

```dart
class HeadshotResult {
  final String url;
  final int creditsUsed;
  final int remainingCredits;
  final int processingTime;
  final String styleName;
  
  factory HeadshotResult.fromJson(Map<String, dynamic> json) {
    final data = json['data'];
    return HeadshotResult(
      url: data['url'],
      creditsUsed: data['creditsUsed'],
      remainingCredits: data['remainingCredits'],
      processingTime: data['processingTime'],
      styleName: data['style'],
    );
  }
}

// Display the result
void showResult(HeadshotResult result) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text('✨ Headshot Generated!'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Display generated headshot
          Image.network(result.url),
          
          SizedBox(height: 16),
          
          // Show details
          Text('Style: ${result.styleName}'),
          Text('Credits Used: ${result.creditsUsed}'),
          Text('Remaining: ${result.remainingCredits}'),
          Text('Processing Time: ${result.processingTime}s'),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Close'),
        ),
        ElevatedButton(
          onPressed: () => downloadImage(result.url),
          child: Text('Download'),
        ),
        ElevatedButton(
          onPressed: () => shareImage(result.url),
          child: Text('Share'),
        ),
      ],
    ),
  );
  
  // Update user's credit balance in app state
  updateCredits(result.remainingCredits);
}
```

---

# 💻 **Complete Flutter Example**

```dart
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';

class HeadshotService {
  final String baseUrl = 'https://your-backend.vercel.app';
  final String authToken;

  HeadshotService(this.authToken);

  // STEP 1: Load Configuration
  Future<HeadshotConfig?> loadConfig() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/api/headshots/config'),
        headers: {'Content-Type': 'application/json'},
      ).timeout(Duration(seconds: 30));

      print('Config Response: ${response.body}');

      final jsonData = jsonDecode(response.body);
      
      if (jsonData['statusCode'] != 200) {
        throw Exception(jsonData['message'] ?? 'Failed to load config');
      }

      return HeadshotConfig.fromJson(jsonData);

    } catch (e) {
      print('Error loading config: $e');
      return null;
    }
  }

  // STEP 2: Convert Image to Base64
  Future<String> convertImageToBase64(File imageFile) async {
    final bytes = await imageFile.readAsBytes();
    return 'data:image/jpeg;base64,${base64Encode(bytes)}';
  }

  // STEP 3: Generate Headshot
  Future<HeadshotResult?> generateHeadshot({
    required File imageFile,
    required String styleId,
    required String aspectRatio,
  }) async {
    try {
      // Convert image to base64
      final base64Image = await convertImageToBase64(imageFile);

      print('Generating headshot...');
      print('Style: $styleId');
      print('Aspect Ratio: $aspectRatio');

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

      // Handle different status codes
      if (jsonData['statusCode'] == 401) {
        throw AuthException('Please log in again');
      } else if (jsonData['statusCode'] == 402) {
        throw InsufficientCreditsException(
          required: jsonData['data']['required'],
          available: jsonData['data']['available'],
          shortfall: jsonData['data']['shortfall'],
        );
      } else if (jsonData['statusCode'] != 200) {
        throw Exception(jsonData['message'] ?? 'Generation failed');
      }

      final data = jsonData['data'];
      if (data == null || data['url'] == null) {
        throw Exception('No result URL in response');
      }

      return HeadshotResult.fromJson(jsonData);

    } on TimeoutException {
      print('Timeout - generation takes too long');
      throw Exception('Request timed out. Please try again.');
    } catch (e) {
      print('Error generating headshot: $e');
      rethrow;
    }
  }
}

// STEP 4: Complete Usage Example
class HeadshotScreen extends StatefulWidget {
  @override
  _HeadshotScreenState createState() => _HeadshotScreenState();
}

class _HeadshotScreenState extends State<HeadshotScreen> {
  final HeadshotService service = HeadshotService('YOUR_AUTH_TOKEN');
  
  HeadshotConfig? config;
  String? selectedStyleId;
  String? selectedAspectRatio = '1:1';
  File? selectedImageFile;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    loadConfiguration();
  }

  Future<void> loadConfiguration() async {
    setState(() => isLoading = true);
    
    final loadedConfig = await service.loadConfig();
    
    setState(() {
      config = loadedConfig;
      isLoading = false;
    });
    
    if (loadedConfig == null) {
      showError('Failed to load headshot styles. Please try again.');
    }
  }

  Future<void> selectImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    
    if (pickedFile != null) {
      setState(() {
        selectedImageFile = File(pickedFile.path);
      });
    }
  }

  Future<void> generateHeadshot() async {
    if (selectedImageFile == null || selectedStyleId == null) {
      showError('Please select an image and style');
      return;
    }

    setState(() => isLoading = true);

    try {
      final result = await service.generateHeadshot(
        imageFile: selectedImageFile!,
        styleId: selectedStyleId!,
        aspectRatio: selectedAspectRatio!,
      );

      if (result != null) {
        showSuccess(result);
      }
    } on InsufficientCreditsException catch (e) {
      showInsufficientCreditsDialog(e.required, e.available, e.shortfall);
    } on AuthException {
      navigateToLogin();
    } catch (e) {
      showError('Failed to generate headshot: $e');
    } finally {
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Center(child: CircularProgressIndicator());
    }

    if (config == null) {
      return Center(child: Text('Failed to load configuration'));
    }

    return Scaffold(
      appBar: AppBar(title: Text('Generate Headshot')),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image Selection
            Text('Select Image', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            if (selectedImageFile != null)
              Image.file(selectedImageFile!, height: 200)
            else
              Container(
                height: 200,
                color: Colors.grey[300],
                child: Center(child: Text('No image selected')),
              ),
            ElevatedButton(
              onPressed: selectImage,
              child: Text('Choose Image'),
            ),
            
            SizedBox(height: 24),
            
            // Style Selection
            Text('Select Style', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            GridView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
              ),
              itemCount: config!.styles.length,
              itemBuilder: (context, index) {
                final style = config!.styles[index];
                final isSelected = selectedStyleId == style.id;
                
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedStyleId = style.id;
                    });
                  },
                  child: Card(
                    color: isSelected ? Colors.blue[100] : Colors.white,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Preview Image
                        Expanded(
                          child: Image.network(
                            style.previewUrl,
                            fit: BoxFit.cover,
                            width: double.infinity,
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(8),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                style.name,
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                              Text(
                                '${style.creditCost} credits',
                                style: TextStyle(fontSize: 12),
                              ),
                              if (style.isPremium)
                                Chip(
                                  label: Text('PREMIUM', style: TextStyle(fontSize: 10)),
                                  backgroundColor: Colors.amber,
                                ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
            
            SizedBox(height: 24),
            
            // Aspect Ratio Selection
            Text('Select Aspect Ratio', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: config!.aspectRatios.map((ratio) {
                return ChoiceChip(
                  label: Text('${ratio.displayName} (${ratio.ratio})'),
                  selected: selectedAspectRatio == ratio.ratio,
                  onSelected: (selected) {
                    setState(() {
                      selectedAspectRatio = ratio.ratio;
                    });
                  },
                );
              }).toList(),
            ),
            
            SizedBox(height: 32),
            
            // Generate Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: generateHeadshot,
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Text('Generate Headshot', style: TextStyle(fontSize: 18)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void showSuccess(HeadshotResult result) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('✨ Headshot Generated!'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.network(result.url),
            SizedBox(height: 16),
            Text('Style: ${result.styleName}'),
            Text('Credits Used: ${result.creditsUsed}'),
            Text('Remaining: ${result.remainingCredits}'),
            Text('Processing Time: ${result.processingTime}s'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              // Download image
              downloadImage(result.url);
            },
            child: Text('Download'),
          ),
        ],
      ),
    );
  }

  void showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red),
    );
  }

  void showInsufficientCreditsDialog(int required, int available, int shortfall) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Insufficient Credits'),
        content: Text(
          'You need $required credits but only have $available. '
          'You need $shortfall more credits.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              navigateToBuyCredits();
            },
            child: Text('Buy Credits'),
          ),
        ],
      ),
    );
  }

  void navigateToLogin() {
    // Navigate to login screen
  }

  void navigateToBuyCredits() {
    // Navigate to buy credits screen
  }

  void downloadImage(String url) {
    // Implement image download
  }
}

// Exception classes
class AuthException implements Exception {
  final String message;
  AuthException(this.message);
}

class InsufficientCreditsException implements Exception {
  final int required;
  final int available;
  final int shortfall;
  
  InsufficientCreditsException({
    required this.required,
    required this.available,
    required this.shortfall,
  });
}
```

---

# 📋 **Summary Checklist**

## Config Endpoint
- [ ] Call `GET /api/headshots/config`
- [ ] Parse `data.styles` array
- [ ] Extract `preview_url` for each style
- [ ] Extract `aspectRatios` array
- [ ] Display styles in grid with preview images
- [ ] Allow style and aspect ratio selection

## Generate Endpoint
- [ ] Convert selected image to base64 with `data:image/jpeg;base64,` prefix
- [ ] Send POST request with `Bearer` token
- [ ] Include `imageUrl` (base64), `style` (ID), `aspectRatio`
- [ ] Set timeout to 120 seconds minimum
- [ ] Handle loading state during generation

## Response Handling
- [ ] Check `jsonData['statusCode']` not `response.statusCode`
- [ ] Extract `data.url` for generated headshot
- [ ] Display image using `Image.network(url)`
- [ ] Update user's credit balance from `data.remainingCredits`
- [ ] Show success message with processing time
- [ ] Handle all error cases (401, 402, 400, 422, 500)

## User Experience
- [ ] Show loading indicator during generation
- [ ] Allow download/share of generated headshot
- [ ] Redirect to buy credits if insufficient
- [ ] Show clear error messages
- [ ] Update UI with remaining credits

---

# 🎯 **Key Points**

1. ✅ **Config loads from backend constants** - No database, instant response
2. ✅ **preview_url is now included** - Display style thumbnails
3. ✅ **Send base64 image** - `data:image/jpeg;base64,YOUR_BASE64`
4. ✅ **Use style ID not name** - `"corporate"` not `"Corporate"`
5. ✅ **Set 120s timeout** - Generation takes 20-60 seconds
6. ✅ **Check statusCode in body** - `jsonData['statusCode']` not HTTP status
7. ✅ **Stateless V1.0** - No history saved, immediate response
8. ✅ **Single generation only** - No batch mode in V1.0
9. ✅ **Update credits immediately** - Use `remainingCredits` from response
10. ✅ **Handle all errors** - Show appropriate UI for each case

---

**This is the complete workflow from A to Z!** 🎉
