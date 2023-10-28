import { Pool } from 'pg';
import * as schema from './schema';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

export type Database = NodePgDatabase<typeof schema>;

export class DbContext {
  constructor(private connectionString: string) {}

  build(): Database {
    const pool = new Pool({ connectionString: this.connectionString });
    return drizzle(pool, { schema, logger: true });
  }
}
