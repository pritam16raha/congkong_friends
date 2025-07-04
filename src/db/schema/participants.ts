import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const participants = pgTable('participants', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  name: text('name').notNull(),
  isIdentified: boolean('is_identified').default(false),
  profileCompleted: boolean('profile_completed').default(false),
  industry: text('industry'),
});