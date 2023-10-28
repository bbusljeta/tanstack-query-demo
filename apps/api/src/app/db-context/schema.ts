import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 40 }).notNull(),
  firstName: varchar('first_name', { length: 40 }).notNull(),
  lastName: varchar('last_name', { length: 40 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Accounts = typeof accounts.$inferSelect;
export type InsertAccounts = typeof accounts.$inferInsert;
