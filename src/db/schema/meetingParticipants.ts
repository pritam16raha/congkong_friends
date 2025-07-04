import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { meetings } from "./meetings";
import { participants } from "./participants";
export const meetingParticipants = pgTable(
  "meeting_participants",
  {
    meetingId: uuid("meeting_id")
      .notNull()
      .references(() => meetings.id, { onDelete: "cascade" }),
    participantId: uuid("participant_id")
      .notNull()
      .references(() => participants.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey(table.meetingId, table.participantId),
    };
  }
);
