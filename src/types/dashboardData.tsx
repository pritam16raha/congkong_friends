export type DashboardData = {
  kpis: {
    totalParticipants: number;
    realTimeIdentified: number;
    totalMatches: number;
    averageSatisfaction: number;
    totalMeetings: number;
    peak: number;
  };
  matchingTop5: { name: string; matchCount: number }[];
  meetingInAnticipation: { name: string }[];
  activityByTime: {
    hour: string;
    login_count: number;
    meeting_count: number;
    match_count: number;
  }[];
  insights: { title: string; message: string }[];
};