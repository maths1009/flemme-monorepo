'use client';

import { MiniTaskCard } from '@/components/home';
import { Advert, User } from '@/lib/mockData';
import Image from 'next/image';
import * as React from 'react';

interface RelatedTasksSectionProps {
  user: User;
  location: string;
  relatedTasks: Advert[];
  onTaskClick: (taskId: string) => void;
}

export const RelatedTasksSection: React.FC<RelatedTasksSectionProps> = ({
  user,
  location,
  relatedTasks,
  onTaskClick,
}) => {
  if (relatedTasks.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-800">Tâches de</h2>
          <div className="flex items-center space-x-2">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={`Avatar de ${user.name}`}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <h2>{user.name}</h2>
          </div>
        </div>
        <span className="text-gray-500 text-sm">{location}</span>
      </div>

      <div className="flex space-x-3 overflow-x-auto">
        {relatedTasks.map((task) => (
          <div
            key={task.id}
            className="flex-shrink-0"
            style={{ width: '120px' }}
          >
            <MiniTaskCard
              title={task.title}
              location={task.location}
              price={task.price}
              image={task.image}
              onClick={() => onTaskClick(task.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
