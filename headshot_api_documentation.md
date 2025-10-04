# 🎨 Headshot Generation API Documentation

## 📋 Overview

This document provides a comprehensive specification for the backend API that powers the AI-driven headshot generation feature. The API enables users to upload photos and transform them into professional headshots using various styles and configurations.

---

## 🚀 Quick Start

### Base URL
```
Production: https://api.chitraai.com/v1
Staging: https://staging-api.chitraai.com/v1
Development: http://localhost:8000/v1
```

### Authentication
All API endpoints require authentication using Bearer tokens:
```http
Authorization: Bearer {your_jwt_token}
```

---

## 📍 API Endpoints

### 1. Generate Headshot

**Endpoint:** `POST /api/v1/headshots/generate`

Creates a new headshot generation request.

#### Request

**Headers:**
```http
Content-Type: multipart/form-data
Authorization: Bearer {token}
```

**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_photo` | File | ✅ | Image file (JPEG/PNG, max 10MB) |
| `style` | String | ✅ | One of: `Corporate`, `Executive`, `Actor`, `Model`, `Creative`, `Lifestyle`, `Editorial`, `Cinematic`, `Environmental` |
| `aspect_ratio` | String | ✅ | One of: `1:1`, `4:5`, `3:4`, `16:9`, `9:16` |
| `quality` | String | ❌ | `standard`, `high`, `ultra` (default: `high`) |
| `batch_size` | Integer | ❌ | Number of variations 1-4 (default: 1) |
| `enhance_face` | Boolean | ❌ | Face enhancement toggle (default: true) |
| `background_removal` | Boolean | ❌ | Remove/replace background (default: false) |
| `custom_prompt` | String | ❌ | Additional style instructions |
| `callback_url` | String | ❌ | Webhook URL for async notifications |

#### Response

**Success (200):**
```json
{
  "success": true,
  "data": {
    "generation_id": "hshot_7a9f2b1c8d3e4f5g",
    "status": "processing",
    "estimated_time": 45,
    "credits_used": 3,
    "remaining_credits": 97,
    "preview_url": null,
    "download_urls": [],
    "metadata": {
      "style_applied": "Corporate",
      "aspect_ratio": "3:4",
      "resolution": "768x1024",
      "processing_time": null
    }
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_IMAGE",
    "message": "Image file is too large or invalid format",
    "details": {
      "max_size": "10MB",
      "supported_formats": ["JPEG", "PNG", "WEBP"]
    }
  }
}
```

**Error (402):**
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "Not enough credits to complete this generation",
    "details": {
      "required_credits": 3,
      "available_credits": 1
    }
  }
}
```

---

### 2. Check Generation Status

**Endpoint:** `GET /api/v1/headshots/status/{generation_id}`

Retrieves the current status of a headshot generation.

#### Request

**Headers:**
```http
Authorization: Bearer {token}
```

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `generation_id` | String | Unique generation identifier |

#### Response

**Success (200):**
```json
{
  "success": true,
  "data": {
    "generation_id": "hshot_7a9f2b1c8d3e4f5g",
    "status": "completed",
    "progress": 100,
    "estimated_time_remaining": 0,
    "created_at": "2025-01-15T10:30:00Z",
    "completed_at": "2025-01-15T10:30:45Z",
    "results": [
      {
        "id": "img_1a2b3c4d",
        "url": "https://cdn.chitraai.com/headshots/generated/img_1a2b3c4d.jpg",
        "thumbnail_url": "https://cdn.chitraai.com/headshots/thumbnails/img_1a2b3c4d_thumb.jpg",
        "download_url": "https://api.chitraai.com/v1/headshots/download/img_1a2b3c4d",
        "metadata": {
          "width": 768,
          "height": 1024,
          "file_size": "2.4MB",
          "format": "JPEG"
        }
      }
    ],
    "error": null
  }
}
```

**Status Values:**
- `queued` - Request is in queue waiting for processing
- `processing` - AI is currently generating the headshot
- `completed` - Generation finished successfully
- `failed` - Generation failed with error

---

### 3. Get Styles & Configuration

**Endpoint:** `GET /api/v1/headshots/config`

Retrieves available styles, aspect ratios, and system configuration.

#### Request

**Headers:**
```http
Authorization: Bearer {token}
```

#### Response

**Success (200):**
```json
{
  "success": true,
  "data": {
    "styles": [
      {
        "id": "corporate",
        "name": "Corporate",
        "description": "Professional business headshots with formal attire",
        "preview_url": "https://cdn.chitraai.com/styles/corporate_preview.jpg",
        "tags": ["business", "professional", "formal"],
        "is_premium": false,
        "credit_cost": 2
      },
      {
        "id": "executive",
        "name": "Executive",
        "description": "High-end executive portraits with commanding presence",
        "preview_url": "https://cdn.chitraai.com/styles/executive_preview.jpg",
        "tags": ["leadership", "executive", "premium"],
        "is_premium": true,
        "credit_cost": 3
      },
      {
        "id": "actor",
        "name": "Actor",
        "description": "Entertainment industry headshots with dramatic lighting",
        "preview_url": "https://cdn.chitraai.com/styles/actor_preview.jpg",
        "tags": ["entertainment", "dramatic", "artistic"],
        "is_premium": false,
        "credit_cost": 2
      },
      {
        "id": "model",
        "name": "Model",
        "description": "Fashion and commercial modeling portraits",
        "preview_url": "https://cdn.chitraai.com/styles/model_preview.jpg",
        "tags": ["fashion", "commercial", "beauty"],
        "is_premium": false,
        "credit_cost": 2
      },
      {
        "id": "creative",
        "name": "Creative",
        "description": "Artistic and creative professional portraits",
        "preview_url": "https://cdn.chitraai.com/styles/creative_preview.jpg",
        "tags": ["artistic", "creative", "unique"],
        "is_premium": false,
        "credit_cost": 2
      },
      {
        "id": "lifestyle",
        "name": "Lifestyle",
        "description": "Natural and approachable lifestyle portraits",
        "preview_url": "https://cdn.chitraai.com/styles/lifestyle_preview.jpg",
        "tags": ["natural", "casual", "approachable"],
        "is_premium": false,
        "credit_cost": 2
      },
      {
        "id": "editorial",
        "name": "Editorial",
        "description": "Magazine-quality editorial portraits",
        "preview_url": "https://cdn.chitraai.com/styles/editorial_preview.jpg",
        "tags": ["magazine", "editorial", "professional"],
        "is_premium": true,
        "credit_cost": 3
      },
      {
        "id": "cinematic",
        "name": "Cinematic",
        "description": "Dramatic cinematic lighting and composition",
        "preview_url": "https://cdn.chitraai.com/styles/cinematic_preview.jpg",
        "tags": ["cinematic", "dramatic", "moody"],
        "is_premium": true,
        "credit_cost": 3
      },
      {
        "id": "environmental",
        "name": "Environmental",
        "description": "Location-based professional portraits",
        "preview_url": "https://cdn.chitraai.com/styles/environmental_preview.jpg",
        "tags": ["location", "environmental", "context"],
        "is_premium": false,
        "credit_cost": 2
      }
    ],
    "aspect_ratios": [
      {
        "ratio": "1:1",
        "description": "Square",
        "width": 1024,
        "height": 1024,
        "use_cases": ["Social media profile", "LinkedIn"]
      },
      {
        "ratio": "4:5",
        "description": "Portrait",
        "width": 819,
        "height": 1024,
        "use_cases": ["Instagram posts", "Print media"]
      },
      {
        "ratio": "3:4",
        "description": "Classic",
        "width": 768,
        "height": 1024,
        "use_cases": ["Traditional headshots", "Professional portfolios"]
      },
      {
        "ratio": "16:9",
        "description": "Wide",
        "width": 1024,
        "height": 576,
        "use_cases": ["Website headers", "Banners"]
      },
      {
        "ratio": "9:16",
        "description": "Vertical",
        "width": 576,
        "height": 1024,
        "use_cases": ["Mobile wallpapers", "Story formats"]
      }
    ],
    "quality_options": [
      {
        "level": "standard",
        "description": "Good quality - Fast processing",
        "credits": 1,
        "resolution": "512x512"
      },
      {
        "level": "high",
        "description": "High quality - Balanced speed and quality",
        "credits": 2,
        "resolution": "768x768"
      },
      {
        "level": "ultra",
        "description": "Ultra quality - Best results",
        "credits": 3,
        "resolution": "1024x1024"
      }
    ],
    "limits": {
      "max_file_size": "10MB",
      "supported_formats": ["JPEG", "PNG", "WEBP"],
      "min_resolution": "512x512",
      "max_batch_size": 4,
      "daily_generation_limit": 50,
      "concurrent_generations": 3
    }
  }
}
```

---

### 4. Get Generation History

**Endpoint:** `GET /api/v1/headshots/history`

Retrieves user's headshot generation history.

#### Request

**Headers:**
```http
Authorization: Bearer {token}
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | Integer | ❌ | Page number (default: 1) |
| `limit` | Integer | ❌ | Items per page (default: 20, max: 50) |
| `style` | String | ❌ | Filter by style |
| `status` | String | ❌ | Filter by status |
| `date_from` | String | ❌ | Filter from date (ISO 8601) |
| `date_to` | String | ❌ | Filter to date (ISO 8601) |

#### Response

**Success (200):**
```json
{
  "success": true,
  "data": {
    "generations": [
      {
        "id": "hshot_7a9f2b1c8d3e4f5g",
        "status": "completed",
        "style": "Corporate",
        "aspect_ratio": "3:4",
        "created_at": "2025-01-15T10:30:00Z",
        "completed_at": "2025-01-15T10:30:45Z",
        "thumbnail_url": "https://cdn.chitraai.com/headshots/thumbnails/thumb_1.jpg",
        "results_count": 1,
        "credits_used": 3,
        "is_favorite": false
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 87,
      "per_page": 20,
      "has_next": true,
      "has_previous": false
    }
  }
}
```

---

### 5. Download Generated Image

**Endpoint:** `GET /api/v1/headshots/download/{image_id}`

Downloads a generated headshot image.

#### Request

**Headers:**
```http
Authorization: Bearer {token}
```

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `image_id` | String | Unique image identifier |

#### Response

**Success (200):**
Returns the image file with appropriate headers:
```http
Content-Type: image/jpeg
Content-Disposition: attachment; filename="headshot_corporate_2025-01-15.jpg"
Content-Length: 2457600
```

---

### 6. Manage Generations

#### Delete Generation
**Endpoint:** `DELETE /api/v1/headshots/{generation_id}`

Deletes a generation and all associated images.

#### Mark as Favorite
**Endpoint:** `POST /api/v1/headshots/{generation_id}/favorite`

Toggles favorite status for a generation.

#### Batch Operations
**Endpoint:** `POST /api/v1/headshots/batch`

Performs batch operations on multiple generations.

---

## 🔧 Backend Architecture

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  credits_remaining INTEGER DEFAULT 5,
  total_generations INTEGER DEFAULT 0,
  daily_generations INTEGER DEFAULT 0,
  last_generation_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Headshot Generations Table
```sql
CREATE TABLE headshot_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  original_image_url VARCHAR(500),
  original_image_hash VARCHAR(64),
  style VARCHAR(50) NOT NULL,
  aspect_ratio VARCHAR(10) NOT NULL,
  quality VARCHAR(20) DEFAULT 'high',
  batch_size INTEGER DEFAULT 1,
  status VARCHAR(20) DEFAULT 'queued',
  credits_used INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  processing_started_at TIMESTAMP,
  processing_completed_at TIMESTAMP,
  estimated_completion TIMESTAMP,
  error_message TEXT,
  callback_url VARCHAR(500),
  metadata JSONB,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_headshot_generations_user_id ON headshot_generations(user_id);
CREATE INDEX idx_headshot_generations_status ON headshot_generations(status);
CREATE INDEX idx_headshot_generations_created_at ON headshot_generations(created_at);
```

#### Generated Images Table
```sql
CREATE TABLE generated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  generation_id UUID REFERENCES headshot_generations(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  download_url VARCHAR(500),
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  format VARCHAR(10),
  quality_score DECIMAL(3,2),
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_generated_images_generation_id ON generated_images(generation_id);
```

#### Style Configurations Table
```sql
CREATE TABLE headshot_styles (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  preview_image_url VARCHAR(500),
  prompt_template TEXT NOT NULL,
  negative_prompt TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  credit_cost INTEGER DEFAULT 2,
  sort_order INTEGER DEFAULT 0,
  tags JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Processing Pipeline

#### 1. Image Upload & Validation
```python
class ImageValidationService:
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
    SUPPORTED_FORMATS = ['JPEG', 'PNG', 'WEBP']
    MIN_RESOLUTION = (512, 512)
    MAX_RESOLUTION = (4096, 4096)
    
    def validate_image(self, file):
        """
        Validates uploaded image file
        Returns: dict with validation results
        """
        results = {
            'valid': True,
            'errors': [],
            'warnings': [],
            'metadata': {}
        }
        
        # Check file size
        if file.size > self.MAX_FILE_SIZE:
            results['valid'] = False
            results['errors'].append(f"File size {file.size} exceeds limit {self.MAX_FILE_SIZE}")
        
        # Validate format and detect actual file type
        image = Image.open(file)
        if image.format not in self.SUPPORTED_FORMATS:
            results['valid'] = False
            results['errors'].append(f"Unsupported format: {image.format}")
        
        # Check resolution
        width, height = image.size
        if width < self.MIN_RESOLUTION[0] or height < self.MIN_RESOLUTION[1]:
            results['valid'] = False
            results['errors'].append(f"Resolution {width}x{height} below minimum {self.MIN_RESOLUTION}")
        
        # Detect faces
        face_detection = self.detect_faces(image)
        if face_detection['faces_count'] == 0:
            results['warnings'].append("No faces detected in image")
        elif face_detection['faces_count'] > 1:
            results['warnings'].append("Multiple faces detected, will process primary face")
        
        # Content safety check
        safety_check = self.check_content_safety(image)
        if not safety_check['safe']:
            results['valid'] = False
            results['errors'].append("Image contains inappropriate content")
        
        results['metadata'] = {
            'width': width,
            'height': height,
            'format': image.format,
            'faces_detected': face_detection['faces_count'],
            'file_hash': self.calculate_hash(file)
        }
        
        return results
```

#### 2. AI Model Integration
```python
class HeadshotGenerationService:
    def __init__(self):
        self.model_endpoints = {
            'stable_diffusion': 'https://api.replicate.com/v1/predictions',
            'midjourney': 'https://api.midjourney.com/v1/imagine',
            'custom_model': 'https://internal-ai.chitraai.com/generate'
        }
    
    async def generate_headshot(self, generation_request):
        """
        Main generation method
        """
        try:
            # Update status to processing
            await self.update_generation_status(
                generation_request.id, 
                'processing', 
                progress=10
            )
            
            # Prepare image and prompts
            processed_image = await self.preprocess_image(
                generation_request.original_image_url
            )
            
            prompt = await self.build_prompt(
                generation_request.style,
                generation_request.custom_prompt
            )
            
            # Update progress
            await self.update_generation_status(
                generation_request.id,
                'processing',
                progress=30
            )
            
            # Generate with AI model
            results = await self.call_ai_model(
                processed_image,
                prompt,
                generation_request.aspect_ratio,
                generation_request.quality,
                generation_request.batch_size
            )
            
            # Update progress
            await self.update_generation_status(
                generation_request.id,
                'processing',
                progress=80
            )
            
            # Post-process and save results
            final_images = await self.postprocess_results(results)
            
            # Save to database and storage
            saved_images = await self.save_generated_images(
                generation_request.id,
                final_images
            )
            
            # Update status to completed
            await self.update_generation_status(
                generation_request.id,
                'completed',
                progress=100,
                results=saved_images
            )
            
            # Send webhook notification if requested
            if generation_request.callback_url:
                await self.send_webhook_notification(generation_request)
                
            return saved_images
            
        except Exception as e:
            # Handle errors
            await self.update_generation_status(
                generation_request.id,
                'failed',
                error_message=str(e)
            )
            raise
```

#### 3. Queue Management
```python
# Using Celery for background processing
@celery.task(bind=True, max_retries=3)
def process_headshot_generation(self, generation_id):
    """
    Celery task for processing headshot generation
    """
    try:
        generation = HeadshotGeneration.objects.get(id=generation_id)
        service = HeadshotGenerationService()
        
        # Process the generation
        result = service.generate_headshot(generation)
        
        return {
            'status': 'success',
            'generation_id': generation_id,
            'results_count': len(result)
        }
        
    except Exception as exc:
        # Retry logic
        if self.request.retries < self.max_retries:
            # Exponential backoff
            countdown = 2 ** self.request.retries
            raise self.retry(countdown=countdown, exc=exc)
        else:
            # Mark as permanently failed
            HeadshotGeneration.objects.filter(id=generation_id).update(
                status='failed',
                error_message=str(exc)
            )
            raise
```

---

## 🔒 Security & Rate Limiting

### Authentication
- JWT tokens with 24-hour expiration
- Refresh token mechanism for seamless user experience
- API key authentication for server-to-server communication

### Rate Limiting
```python
RATE_LIMITS = {
    'headshot_generation': {
        'free': '5/day',
        'pro': '50/day', 
        'premium': '200/day'
    },
    'status_check': '100/minute',
    'download': '20/hour',
    'config_fetch': '10/minute'
}
```

### Content Safety
- NSFW content detection using Azure Content Moderator
- Face detection validation
- Duplicate image prevention using perceptual hashing
- Virus scanning for uploaded files

### Data Protection
- Encrypted storage for user images (AES-256)
- Automatic image deletion after 30 days (configurable)
- GDPR compliance with data export/deletion capabilities
- Audit logging for all generation requests

---

## 📊 Analytics & Monitoring

### Metrics Collection
```python
# Key metrics to track
METRICS = {
    'generation_requests': 'Counter',
    'generation_completion_time': 'Histogram',
    'generation_success_rate': 'Gauge',
    'api_response_time': 'Histogram',
    'credits_consumed': 'Counter',
    'user_satisfaction_score': 'Gauge'
}
```

### Health Checks
```python
# Health check endpoints
@app.route('/health/headshots')
def headshot_health():
    checks = {
        'database': check_database_connection(),
        'ai_model': check_ai_model_availability(),
        'storage': check_storage_accessibility(),
        'queue': check_queue_health()
    }
    
    overall_status = 'healthy' if all(checks.values()) else 'unhealthy'
    
    return {
        'status': overall_status,
        'timestamp': datetime.utcnow().isoformat(),
        'checks': checks
    }
```

---

## 💰 Credit System & Billing

### Credit Costs
```python
CREDIT_COSTS = {
    'generation': {
        'standard_quality': 1,
        'high_quality': 2,
        'ultra_quality': 3
    },
    'features': {
        'batch_generation': 1,  # per additional image
        'background_removal': 1,
        'face_enhancement': 1,
        'priority_processing': 2
    },
    'styles': {
        'basic': 0,  # Additional cost for basic styles
        'premium': 1  # Additional cost for premium styles
    }
}
```

### Subscription Plans
```python
SUBSCRIPTION_PLANS = {
    'free': {
        'monthly_credits': 5,
        'daily_limit': 2,
        'max_batch_size': 1,
        'quality_levels': ['standard'],
        'styles_access': 'basic',
        'priority_processing': False,
        'api_access': False
    },
    'pro': {
        'monthly_credits': 100,
        'daily_limit': 20,
        'max_batch_size': 4,
        'quality_levels': ['standard', 'high'],
        'styles_access': 'all',
        'priority_processing': False,
        'api_access': True,
        'price': 9.99
    },
    'premium': {
        'monthly_credits': 500,
        'daily_limit': 50,
        'max_batch_size': 4,
        'quality_levels': ['standard', 'high', 'ultra'],
        'styles_access': 'all',
        'priority_processing': True,
        'api_access': True,
        'custom_styles': True,
        'price': 29.99
    }
}
```

---

## 🚀 Deployment & Scaling

### Technology Stack
- **Backend**: Python Django/FastAPI
- **Database**: PostgreSQL with Redis for caching
- **Queue**: Celery with Redis broker
- **Storage**: AWS S3 with CloudFront CDN
- **AI Processing**: GPU instances (NVIDIA A100/V100)
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

### Infrastructure
```yaml
# Docker Compose for development
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/chitraai
      - REDIS_URL=redis://redis:6379
      - AWS_S3_BUCKET=chitraai-headshots
    depends_on:
      - db
      - redis
  
  worker:
    build: .
    command: celery -A chitraai worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/chitraai
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=chitraai
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Performance Optimization
- **Horizontal scaling**: Load balancer with multiple API instances
- **Database optimization**: Read replicas, connection pooling
- **Caching strategy**: Redis for session data, CDN for static assets
- **Image optimization**: WebP format, multiple resolutions
- **Background processing**: Separate worker pools for different priorities

---

## 🧪 Testing

### API Testing
```python
# Example test cases
class TestHeadshotGeneration:
    def test_generate_headshot_success(self):
        """Test successful headshot generation"""
        # Test implementation
        pass
    
    def test_generate_headshot_invalid_image(self):
        """Test generation with invalid image"""
        # Test implementation
        pass
    
    def test_generation_status_check(self):
        """Test status checking functionality"""
        # Test implementation
        pass
    
    def test_rate_limiting(self):
        """Test rate limiting enforcement"""
        # Test implementation
        pass
```

### Load Testing
```bash
# Artillery.js load test configuration
config:
  target: 'https://api.chitraai.com'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120
      arrivalRate: 50
    - duration: 60
      arrivalRate: 100

scenarios:
  - name: "Generate headshot"
    requests:
      - post:
          url: "/v1/headshots/generate"
          headers:
            Authorization: "Bearer {{ token }}"
          formData:
            user_photo: "@sample_photo.jpg"
            style: "Corporate"
            aspect_ratio: "3:4"
```

---

## 📝 Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_IMAGE` | Image format or size invalid | 400 |
| `INSUFFICIENT_CREDITS` | Not enough credits | 402 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `GENERATION_NOT_FOUND` | Generation ID not found | 404 |
| `PROCESSING_ERROR` | AI model processing failed | 500 |
| `STORAGE_ERROR` | File storage operation failed | 500 |
| `QUEUE_FULL` | Processing queue at capacity | 503 |

---

## 📞 Support & Contact

- **API Documentation**: https://docs.chitraai.com/headshots
- **Developer Support**: developers@chitraai.com
- **Status Page**: https://status.chitraai.com
- **GitHub Issues**: https://github.com/chitraai/headshot-api/issues

---

*Last updated: January 15, 2025*
*API Version: v1.0*