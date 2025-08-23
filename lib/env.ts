import z from "zod";

const envSchema = z.object({
  GETIMAGE_AI_TOKEN: z.string(),
  DATABASE_URL: z.string(),
  TOKEN_SECRET: z.string().default('your-token-secret'),
  TOKEN_EXPIRE_IN: z.string().default('1d'),
  ADMIN_SECRET: z.string().default('your-admin-secret'),
  CONTACT_EMAIL: z.email().default('contact@example.com'),
  WEBSITE_URL: z.string().default('https://example.com'),
  FIREBASE_SERVICE_ACCOUNT_BASE64: z.string(),
});

export default envSchema.parse(process.env);
