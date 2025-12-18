'use client';

import { MiniTaskCard } from '@/components/home';
import { Advert } from '@/lib/mockData';
import * as React from 'react';

interface SuggestedTasksSectionProps {
  location: string;
  suggestedTasks: Advert[];
  onTaskClick: (taskId: string) => void;
}

export const SuggestedTasksSection: React.FC<SuggestedTasksSectionProps> = ({
  location,
  suggestedTasks,
  onTaskClick,
}) => {
  if (suggestedTasks.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Tâches qui peuvent vous intéresser
        </h2>
        <span className="text-gray-500 text-sm">{location}</span>
      </div>

      <div className="flex space-x-3 overflow-x-auto">
        {suggestedTasks.map((task) => (
          <div
            key={`suggested-${task.id}`}
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
