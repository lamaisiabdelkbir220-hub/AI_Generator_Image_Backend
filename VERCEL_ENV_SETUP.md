# Vercel Environment Variables Setup for Chitra AI

## Required Environment Variables

Add these in your Vercel Dashboard → Project Settings → Environment Variables:

### 1. Database Configuration
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```
Replace `[YOUR-PASSWORD]` and `[PROJECT-REF]` with your actual Supabase values.

### 2. GetImage.ai API
```
GETIMAGE_AI_TOKEN=gim_your_api_token_here
```
Get this from your GetImage.ai dashboard → API Keys

### 3. Firebase Service Account (Base64)
```
FIREBASE_SERVICE_ACCOUNT_BASE64=your_base64_encoded_service_account
```
1. Download service account JSON from Firebase Console
2. Convert to base64: `base64 -i service-account.json`
3. Use the resulting base64 string

### 4. JWT Configuration
```
TOKEN_SECRET=your-super-secure-jwt-secret-key-32-chars-minimum
TOKEN_EXPIRE_IN=7d
```

### 5. Admin API Secret
```
ADMIN_SECRET=your-admin-secret-for-internal-apis
```

### 6. App Configuration
```
CONTACT_EMAIL=support@yourapp.com
WEBSITE_URL=https://your-app.vercel.app
```

### 7. Optional: Google OAuth (if using)
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## Setting Variables in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable above
5. Make sure to set them for all environments (Production, Preview, Development)

## After Setting Variables

1. Redeploy your project
2. Run the database schema push (see next steps)