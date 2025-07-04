CREATE TABLE "participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"name" text NOT NULL,
	"is_identified" boolean DEFAULT false,
	"profile_completed" boolean DEFAULT false,
	"industry" text
);
--> statement-breakpoint
CREATE TABLE "meetings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scheduled_time" timestamp with time zone NOT NULL,
	"status" text DEFAULT 'anticipated' NOT NULL,
	"satisfaction_score" integer
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"participant_one_id" uuid,
	"participant_two_id" uuid
);
--> statement-breakpoint
CREATE TABLE "meeting_participants" (
	"meeting_id" uuid NOT NULL,
	"participant_id" uuid NOT NULL,
	CONSTRAINT "meeting_participants_meeting_id_participant_id_pk" PRIMARY KEY("meeting_id","participant_id")
);
--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"activity_type" text NOT NULL,
	"participant_id" uuid
);
--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_participant_one_id_participants_id_fk" FOREIGN KEY ("participant_one_id") REFERENCES "public"."participants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_participant_two_id_participants_id_fk" FOREIGN KEY ("participant_two_id") REFERENCES "public"."participants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeting_participants" ADD CONSTRAINT "meeting_participants_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeting_participants" ADD CONSTRAINT "meeting_participants_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE cascade ON UPDATE no action;