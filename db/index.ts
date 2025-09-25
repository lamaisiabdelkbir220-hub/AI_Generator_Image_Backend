import env from '@/lib/env';
import { drizzle } from 'drizzle-orm/postgres-js'

// Provide fallback for build time, but will be overridden at runtime
const databaseUrl = env.DATABASE_URL || 'postgresql://localhost:5432/fallback';

export const db = drizzle(databaseUrl);

export type db = typeof db;

export default db;
