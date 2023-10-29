import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config();

const { DB_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, DB_PORT } =
  process.env;

export default {
  schema: './src/app/**/**.entity.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=public`,
  },
  out: './src/app/db-context/migrations',
} satisfies Config;
