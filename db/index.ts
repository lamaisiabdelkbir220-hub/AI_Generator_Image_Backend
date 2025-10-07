import env from '@/lib/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Provide fallback for build time, but will be overridden at runtime
const databaseUrl = env.DATABASE_URL || 'postgresql://localhost:5432/fallback';

// Create postgres client with connection pooling optimized for serverless
const client = postgres(databaseUrl, {
  max: 1, // Maximum connections (serverless functions should use 1)
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Connection timeout in seconds
  prepare: false, // Disable prepared statements for better compatibility
});

export const db = drizzle(client);

export type db = typeof db;

export default db;
