import { db } from "@/db";
import * as schema from "@/db/schema";
import { sql, count, avg, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const kpiPromises = {
      totalParticipants: db
        .select({ value: count() })
        .from(schema.participants),
      realTimeIdentified: db
        .select({ value: count() })
        .from(schema.participants)
        .where(sql`${schema.participants.isIdentified} = true`),
      totalMatches: db.select({ value: count() }).from(schema.matches),
      averageSatisfaction: db
        .select({ value: avg(schema.meetings.satisfactionScore) })
        .from(schema.meetings),
      totalMeetings: db.select({ value: count() }).from(schema.meetings),
    };

    const [
      totalParticipantsRes,
      realTimeIdentifiedRes,
      totalMatchesRes,
      avgSatisfactionRes,
      totalMeetingsRes,
    ] = await Promise.all(Object.values(kpiPromises));

    const kpis = {
      totalParticipants: totalParticipantsRes[0].value,
      realTimeIdentified: realTimeIdentifiedRes[0].value,
      totalMatches: totalMatchesRes[0].value,
      averageSatisfaction: Math.round(
        parseFloat(String(avgSatisfactionRes[0].value ?? "0"))
      ),
      totalMeetings: totalMeetingsRes[0].value,
      peak: 4.3,
    };

    // const listsPromises = {
    //   matchingTop5: db
    //     .select({
    //       name: schema.participants.name,
    //       matchCount: count(schema.matches.id),
    //     })
    //     .from(schema.participants)
    //     .leftJoin(
    //       schema.matches,
    //       sql`participants.id = matches.participant_one_id OR participants.id = matches.participant_two_id`
    //     )
    //     .groupBy(schema.participants.id)
    //     .orderBy(desc(count(schema.matches.id)))
    //     .limit(5),

    //   meetingInAnticipation: db
    //     .select({ name: schema.participants.name })
    //     .from(schema.meetingParticipants)
    //     .innerJoin(
    //       schema.meetings,
    //       sql`${schema.meetingParticipants.meetingId} = ${schema.meetings.id}`
    //     )
    //     .innerJoin(
    //       schema.participants,
    //       sql`${schema.meetingParticipants.participantId} = ${schema.participants.id}`
    //     )
    //     .where(sql`${schema.meetings.status} = 'anticipated'`)
    //     .orderBy(schema.meetings.scheduledTime)
    //     .limit(5),
    // };

    const [matchingTop5, meetingInAnticipation] = await Promise.all([
      db
        .select({
          name: schema.participants.name,
          matchCount: count(schema.matches.id),
        })
        .from(schema.participants)
        .leftJoin(
          schema.matches,
          sql`participants.id = matches.participant_one_id OR participants.id = matches.participant_two_id`
        )
        .groupBy(schema.participants.id)
        .orderBy(desc(count(schema.matches.id)))
        .limit(5),

      db
        .select({ name: schema.participants.name })
        .from(schema.meetingParticipants)
        .innerJoin(
          schema.meetings,
          sql`${schema.meetingParticipants.meetingId} = ${schema.meetings.id}`
        )
        .innerJoin(
          schema.participants,
          sql`${schema.meetingParticipants.participantId} = ${schema.participants.id}`
        )
        .where(sql`${schema.meetings.status} = 'anticipated'`)
        .orderBy(schema.meetings.scheduledTime)
        .limit(5),
    ]);

    const activityByTime = await db
      .select({
        hour: sql<string>`to_char(created_at, 'HH24:00')`.as("hour"),
        login_count: count(
          sql`CASE WHEN activity_type = 'participant_login' THEN 1 ELSE NULL END`
        ),
        meeting_count: count(
          sql`CASE WHEN activity_type = 'meeting_created' THEN 1 ELSE NULL END`
        ),
        match_count: count(
          sql`CASE WHEN activity_type = 'match_created' THEN 1 ELSE NULL END`
        ),
      })
      .from(schema.activityLogs)
      .groupBy(sql`hour`)
      .orderBy(sql`hour`);

    const uncompletedProfilesCount = await db
      .select({ value: count() })
      .from(schema.participants)
      .where(sql`${schema.participants.profileCompleted} = false`);

    const insights = [
      {
        title: "Surge Industry-Identified",
        message: "Match success rate between 4 industries assigned-quality",
      },
      {
        title: "Numerous Incompleted Profiles",
        message: `${uncompletedProfilesCount[0].value} participants completing profiles, potentially low quality`,
      },
    ];

    return NextResponse.json({
      kpis,
      matchingTop5,
      meetingInAnticipation,
      activityByTime,
      insights,
      
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
