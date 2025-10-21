import z from "zod";

const envSchema = z.object({
  GETIMAGE_AI_TOKEN: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(), // Google Gemini API key for headshot generation
  DATABASE_URL: z.string().optional(),
  TOKEN_SECRET: z.string().default('your-token-secret'),
  TOKEN_EXPIRE_IN: z.string().default('1d'),
  ADMIN_SECRET: z.string().default('your-admin-secret'),
  CONTACT_EMAIL: z.email().default('contact@example.com'),
  WEBSITE_URL: z.string().default('https://example.com'),
  FIREBASE_SERVICE_ACCOUNT_BASE64: z.string().optional(),
  CRON_SECRET: z.string().optional(), // Secret for protecting cron endpoints
  
  // IAP (In-App Purchase) Environment Variables
  APPLE_SHARED_SECRET: z.string().optional(), // Apple App Store shared secret
  APPLE_ENV: z.enum(['sandbox', 'production']).default('sandbox'), // Apple environment
  GOOGLE_PACKAGE_NAME: z.string().optional(), // Android package name
  GOOGLE_SERVICE_ACCOUNT_KEY: z.string().optional(), // Google service account JSON (base64 encoded)
  ALLOW_TEST_PURCHASES: z.string().default('true'), // Allow test purchases (set to 'false' in production)
});

// Parse environment variables with fallbacks during build time
const parsedEnv = envSchema.parse(process.env);

// Export with runtime validation for critical variables
export default new Proxy(parsedEnv, {
  get(target, prop) {
    const value = target[prop as keyof typeof target];
    
    // During runtime, check if critical env vars are missing
    if (typeof window === 'undefined' && process.env.NODE_ENV !== 'development') {
      if ((prop === 'DATABASE_URL' || prop === 'GEMINI_API_KEY' || prop === 'FIREBASE_SERVICE_ACCOUNT_BASE64') && !value) {
        console.warn(`Missing environment variable: ${String(prop)}`);
      }
    }
    
    return value;
  }
});
