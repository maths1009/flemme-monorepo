'use client';

import * as React from 'react';
import { PriceTag } from '@/components/common/PriceTag';
import { Avatar } from '@/components/common/Avatar';

interface TaskCardProps {
  title: string;
  image: string;
  avatar: string;
  date: string;
  price: number;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  image,
  avatar,
  date,
  price,
  onClick,
}) => {
  return (
    <div
      className="relative bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Image: {title}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <Avatar src={avatar} alt={title} fallback={title} size="md" />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>

          <div className="text-right">
            <PriceTag price={price} size="medium" />
          </div>
        </div>
      </div>
    </div>
  );
};
