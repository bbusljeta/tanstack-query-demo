import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

export default {
  schema: './src/app/**/**.entity.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public`,
  },
  out: './src/app/db-context/migrations',
} satisfies Config;
