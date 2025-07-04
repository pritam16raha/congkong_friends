"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ActivityChartProps = {
  data: {
    hour: string;
    login_count: number;
    meeting_count: number;
    match_count: number;
  }[];
};

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    ...item,
    'Participant Login': item.login_count,
    'Meeting': item.meeting_count,
    'Matches': item.match_count,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity by Time Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }}/>
          <Line type="monotone" dataKey="Participant Login" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="Meeting" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="Matches" stroke="#ffc658" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;