import {
    integer,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";

export const meetings = pgTable("meetings", {
  id: uuid("id").primaryKey().defaultRandom(),
  scheduledTime: timestamp("scheduled_time", { withTimezone: true }).notNull(),
  status: text("status").notNull().default("anticipated"),
  satisfactionScore: integer("satisfaction_score"),
});
