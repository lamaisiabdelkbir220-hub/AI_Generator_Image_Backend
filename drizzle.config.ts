import { defineConfig } from 'drizzle-kit';
import env from './lib/env';

export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',

  dbCredentials: {
    url: env.DATABASE_URL
  },

  migrations: {
    table: '__migrations',
  },
});
