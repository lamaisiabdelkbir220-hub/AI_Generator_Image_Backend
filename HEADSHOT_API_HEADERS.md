# 🔐 Headshot API Headers Documentation

## Required Headers for Headshot Endpoints

---

## 1️⃣ POST `/api/headshots/generate`

### **Required Headers:**

```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### **Header Details:**

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| `Authorization` | `Bearer {token}` | ✅ **YES** | JWT token from user login |
| `Content-Type` | `application/json` | ✅ **YES** | Request body is JSON |

### **Full Example Request:**

```bash
curl -X POST https://your-domain.com/api/headshots/generate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/photo.jpg",
    "style": "corporate",
    "aspectRatio": "1:1"
  }'
```

### **JavaScript/TypeScript Example:**

```typescript
const response = await fetch('/api/headshots/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    imageUrl: 'https://example.com/photo.jpg',
    style: 'corporate',
    aspectRatio: '1:1'
  })
});
```

### **Flutter/Dart Example:**

```dart
final response = await http.post(
  Uri.parse('https://your-domain.com/api/headshots/generate'),
  headers: {
    'Authorization': 'Bearer $userToken',
    'Content-Type': 'application/json',
  },
  body: jsonEncode({
    'imageUrl': 'https://example.com/photo.jpg',
    'style': 'corporate',
    'aspectRatio': '1:1',
  }),
);
```

### **Authentication Error Response:**

If `Authorization` header is missing or invalid:

```json
{
  "message": "Authentication required",
  "data": null,
  "statusCode": 401
}
```

---

## 2️⃣ GET `/api/headshots/config`

### **Required Headers:**

```http
(No authentication required - Public endpoint)
```

### **Header Details:**

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| `Authorization` | `Bearer {token}` | ❌ **NO** | Optional - config is public |
| `Content-Type` | Not needed | ❌ **NO** | GET request has no body |

### **Full Example Request:**

```bash
# Simple GET request - no headers needed
curl https://your-domain.com/api/headshots/config

# With optional filters
curl "https://your-domain.com/api/headshots/config?category=business&premium=false"
```

### **JavaScript/TypeScript Example:**

```typescript
// No authentication needed
const response = await fetch('/api/headshots/config');
const data = await response.json();

// With filters
const response = await fetch('/api/headshots/config?category=business');
```

### **Flutter/Dart Example:**

```dart
// No headers needed
final response = await http.get(
  Uri.parse('https://your-domain.com/api/headshots/config'),
);

// With query parameters
final response = await http.get(
  Uri.parse('https://your-domain.com/api/headshots/config?category=business'),
);
```

---

## 🔑 How to Get the JWT Token

The `Authorization` token comes from your authentication endpoints:

### Login Endpoints:
```bash
POST /api/auth       # User login (Google/Apple)
POST /api/auth/refresh  # Refresh token
```

### Token Format:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ.signature
```

### Token Contents (decoded):
```json
{
  "id": 123,
  "email": "user@example.com",
  "credits": 100,
  "loginType": "Google"
}
```

---

## 📊 Summary Table

| Endpoint | Method | Auth Required | Headers Needed |
|----------|--------|---------------|----------------|
| `/api/headshots/generate` | POST | ✅ YES | `Authorization`, `Content-Type` |
| `/api/headshots/config` | GET | ❌ NO | None |
| `/api/headshots/history` | GET | ✅ YES | `Authorization` |
| `/api/headshots/status/{id}` | GET | ✅ YES | `Authorization` |

---

## 🚨 Common Errors

### 401 Unauthorized
```json
{
  "message": "Authentication required",
  "statusCode": 401
}
```
**Solution:** Add `Authorization: Bearer {token}` header

### 422 Validation Failed
```json
{
  "message": "Validation failed",
  "statusCode": 422,
  "errors": [...]
}
```
**Solution:** Check request body format and required fields

### 402 Insufficient Credits
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
**Solution:** User needs to purchase more credits

---

## ✅ Testing Your Headers

### Quick Test (No Auth):
```bash
curl https://your-domain.com/api/headshots/config
```
Should return list of styles ✅

### With Authentication:
```bash
curl -X POST https://your-domain.com/api/headshots/generate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"imageUrl":"https://example.com/test.jpg","style":"corporate","aspectRatio":"1:1"}'
```
Should start generation or return auth error ✅