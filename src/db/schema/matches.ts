import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { participants } from './participants';

export const matches = pgTable('matches', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    participantOneId: uuid('participant_one_id').references(() => participants.id, { onDelete: 'cascade' }),
    participantTwoId: uuid('participant_two_id').references(() => participants.id, { onDelete: 'cascade' }),
});