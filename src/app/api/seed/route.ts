import { db } from "@/db";
import * as schema from "@/db/schema";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "ADD_PARTICIPANTS":
        const newParticipants = await db
          .insert(schema.participants)
          .values(
            Array.from({ length: 10 }, () => ({
              name: faker.person.fullName(),
              isIdentified: Math.random() < 0.2,
              profileCompleted: Math.random() > 0.3,

              industry: faker.helpers.arrayElement([
                "Tech",
                "Finance",
                "Healthcare",
              ]),
            }))
          )
          .returning();
        return NextResponse.json({
          message: `Added ${newParticipants.length} participants.`,
        });

      case "CREATE_MEETING":
        const allParticipants = await db.select().from(schema.participants);
        if (allParticipants.length < 2) {
          return NextResponse.json(
            { error: "Not enough participants to create a meeting." },
            { status: 400 }
          );
        }

        const isCompleted = Math.random() > 0.5;

        const newMeeting = await db
          .insert(schema.meetings)
          .values({
            scheduledTime: faker.date.future(),
            status: isCompleted ? "completed" : "anticipated",
            satisfactionScore: isCompleted
              ? faker.number.int({ min: 65, max: 95 })
              : undefined,
          })
          .returning();

        const participantsForMeeting = faker.helpers.arrayElements(
          allParticipants,
          { min: 2, max: 5 }
        );

        await db.insert(schema.meetingParticipants).values(
          participantsForMeeting.map((p) => ({
            meetingId: newMeeting[0].id,
            participantId: p.id,
          }))
        );
        return NextResponse.json({
          message: `Created a new ${
            isCompleted ? "completed" : "anticipated"
          } meeting.`,
        });

      case "ADD_ACTIVITY_LOGS":
        const participantsForLogs = await db
          .select({ id: schema.participants.id })
          .from(schema.participants);
        if (participantsForLogs.length === 0) {
          return NextResponse.json(
            { error: "Add participants before adding activity logs." },
            { status: 400 }
          );
        }
        await db.insert(schema.activityLogs).values(
          Array.from({ length: 50 }, () => ({
            activityType: faker.helpers.arrayElement([
              "participant_login",
              "meeting_created",
              "match_created",
            ]),
            createdAt: faker.date.between({
              from: new Date(new Date().setHours(9, 0, 0, 0)),
              to: new Date(new Date().setHours(17, 0, 0, 0)),
            }),
            participantId: faker.helpers.arrayElement(participantsForLogs).id,
          }))
        );
        return NextResponse.json({ message: "Added 50 new activity logs." });

      case "CREATE_MATCHES":
        const participantsForMatch = await db
          .select({ id: schema.participants.id })
          .from(schema.participants);
        if (participantsForMatch.length < 2) {
          return NextResponse.json(
            { error: "Not enough participants to create matches." },
            { status: 400 }
          );
        }

        await db.insert(schema.matches).values(
          Array.from({ length: 20 }, () => ({
            participantOneId:
              faker.helpers.arrayElement(participantsForMatch).id,
            participantTwoId:
              faker.helpers.arrayElement(participantsForMatch).id,
          }))
        );
        return NextResponse.json({ message: "Added 20 new matches." });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json(
      { error: "Failed to perform seed action" },
      { status: 500 }
    );
  }
}
