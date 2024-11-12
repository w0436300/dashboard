import React from 'react';

const Card = ({ color, title, value, change, icon }) => {
  return (
    <div className={`${color} rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4`}>
      <div className="flex flex-col">
        <div className="flex-shrink-0 mb-2">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] lg:text-sm text-gray-500 truncate">{title}</div>
          <div className="text-sm lg:text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-[10px] lg:text-sm text-blue-500 truncate">{change}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
