import Avatar from "@/components/Avatar";
import React from "react";

type ListItem = {
  name: string;
  avatar?: string | null;
};

type InfoListProps = {
  title: string;
  items: ListItem[];
};

const InfoList: React.FC<InfoListProps> = ({ title, items }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center py-2 border-b border-gray-200 last:border-b-0"
          >
            <span className="text-gray-500 font-bold mr-3">{index + 1}.</span>
            <div className="mr-3">
              <Avatar name={item.name} src={item.avatar} />
            </div>
            <span className="text-gray-700">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoList;
