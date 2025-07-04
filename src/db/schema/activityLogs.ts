import { bigserial, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { participants } from "./participants";

export const activityLogs = pgTable("activity_logs", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  activityType: text("activity_type").notNull(),
  participantId: uuid("participant_id").references(() => participants.id, {
    onDelete: "cascade",
  }),
});
