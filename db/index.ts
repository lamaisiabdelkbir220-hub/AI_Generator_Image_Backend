import env from '@/lib/env';
import { drizzle } from 'drizzle-orm/postgres-js'

export const db = drizzle(env.DATABASE_URL);

export type db = typeof db;

export default db;
