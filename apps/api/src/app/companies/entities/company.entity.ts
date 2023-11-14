import { pgTable, timestamp, varchar, bigserial } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

export const companies = pgTable('companies', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slogan: varchar('slogan', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Companies = InferSelectModel<typeof companies>;
