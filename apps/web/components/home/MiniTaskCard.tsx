'use client';

import * as React from 'react';

interface MiniTaskCardProps {
  title: string;
  location: string;
  price: number;
  image: string;
  onClick?: () => void;
}

export const MiniTaskCard: React.FC<MiniTaskCardProps> = ({
  title,
  location,
  price,
  image,
  onClick,
}) => {
  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer px-2"
      style={{ width: '31%' }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="h-16 w-full rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ borderRadius: '8px' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Contenu */}
      <div className="p-1.5">
        {/* Titre */}
        <h3 className="text-xs font-semibold text-gray-800 mb-0.5 leading-tight line-clamp-2">
          {title}
        </h3>

        {/* Localisation */}
        <p className="text-xs text-gray-500 mb-1.5">{location}</p>

        {/* Prix */}
        <div className="flex justify-start">
          <span
            className="px-1.5 py-0.5 text-xs font-medium text-white"
            style={{
              backgroundColor: '#4E77CF',
              border: '1px solid #739BF2',
              borderRadius: '4px',
            }}
          >
            {price}€
          </span>
        </div>
      </div>
    </div>
  );
};
