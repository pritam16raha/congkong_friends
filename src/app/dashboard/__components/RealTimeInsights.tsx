import { DashboardData } from '@/types/dashboardData';
import React from 'react';

type RealTimeInsightsProps = {
  insights: DashboardData['insights'];
};

const RealTimeInsights: React.FC<RealTimeInsightsProps> = ({ insights }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Real-Time Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <p className="font-bold text-yellow-600">{insight.title}</p>
                    <p className="text-sm text-gray-600">{insight.message}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default RealTimeInsights;