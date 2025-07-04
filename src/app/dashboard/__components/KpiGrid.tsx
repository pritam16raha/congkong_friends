import React from 'react';
import KpiCard from './KpiCard';
import { DashboardData } from '@/types/dashboardData';

const UsersIcon = () => <div className="bg-blue-100 p-2 rounded-full"><svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.184-1.268-.5-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.184-1.268.5-1.857m0 0a5.002 5.002 0 019 0m0 0a5 5 0 005 0m-9 0a5.002 5.002 0 01-9 0" /></svg></div>;
const CheckIcon = () => <div className="bg-green-100 p-2 rounded-full"><svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
const MatchIcon = () => <div className="bg-purple-100 p-2 rounded-full"><svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>;
const StarIcon = () => <div className="bg-yellow-100 p-2 rounded-full"><svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></div>;
const MeetingIcon = () => <div className="bg-red-100 p-2 rounded-full"><svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></div>;


type KpiGridProps = {
  kpis: DashboardData['kpis'];
};

const KpiGrid: React.FC<KpiGridProps> = ({ kpis }) => {
  const kpiData = [
    { title: 'Total Participants', value: kpis.totalParticipants.toString(), icon: <UsersIcon /> },
    { title: 'Real-Time Identified', value: kpis.realTimeIdentified.toString(), details: `(${(kpis.realTimeIdentified / kpis.totalParticipants * 100 || 0).toFixed(0)}%)`, icon: <CheckIcon /> },
    { title: 'Total Matches', value: kpis.totalMatches.toString(), icon: <MatchIcon /> },
    { title: 'Average Satisfaction', value: `${kpis.averageSatisfaction}%`, icon: <StarIcon /> },
    { title: 'Total Meetings', value: kpis.totalMeetings.toString(), icon: <MeetingIcon /> },
    { title: 'Peak', value: kpis.peak.toString(), icon: <StarIcon /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 my-6">
      {kpiData.map((kpi) => (
        <KpiCard
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          details={kpi.details}
          icon={kpi.icon}
        />
      ))}
    </div>
  );
};

export default KpiGrid;