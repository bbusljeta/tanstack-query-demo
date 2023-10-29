import { Pool } from 'pg';

import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { accounts } from '../accounts/entities/account.entity';

const schema = { accounts };
export type Database = NodePgDatabase<typeof schema>;

export class DbContext {
  constructor() {}

  build(connectionString: string): Database {
    const pool = new Pool({ connectionString: connectionString });
    return drizzle(pool, { schema, logger: true });
  }
}
