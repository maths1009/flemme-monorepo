'use client';

import * as React from 'react';

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
      {/* Image principale */}
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Image: {title}</span>
        </div>
      </div>

      {/* Contenu de la card */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Info utilisateur */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-600">Avatar</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>

          {/* Prix */}
          <div className="text-right">
            <span className="text-xl font-bold text-gray-800">{price}€</span>
          </div>
        </div>
      </div>
    </div>
  );
};
