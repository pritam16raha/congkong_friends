import React from 'react';

type KpiCardProps = {
  title: string;
  value: string;
  details?: string;
  icon: React.ReactNode;
};

const KpiCard: React.FC<KpiCardProps> = ({ title, value, details, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {details && <p className="text-xs text-gray-400">{details}</p>}
      </div>
    </div>
  );
};

export default KpiCard;