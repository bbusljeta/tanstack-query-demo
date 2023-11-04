import { pgTable, timestamp, varchar, bigserial } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

export const accounts = pgTable('accounts', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  email: varchar('email', { length: 40 }).unique().notNull(),
  firstName: varchar('first_name', { length: 40 }).notNull(),
  lastName: varchar('last_name', { length: 40 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Accounts = InferSelectModel<typeof accounts>;
