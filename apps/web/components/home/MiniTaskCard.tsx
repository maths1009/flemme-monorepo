'use client';

import { PriceTag } from '@/components/common';
import Image from 'next/image';
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
      className="rounded-lg overflow-hidden cursor-pointer px-2 w-36"
      onClick={onClick}
    >
      {/* Image */}
      <div className="w-33.75 h-40.75 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="w-33.75 h-40.75 object-cover"
          width={135}
          height={163}
          style={{ borderRadius: '8px' }}
        />
      </div>

      {/* Contenu */}
      <div className="p-1.5">
        {/* Titre */}
        <h3 className="text-xs font-semibold text-gray-800 mb-0.5 leading-tight line-clamp-1">
          {title}
        </h3>
        {/* Localisation */}
        <p className="text-xs text-gray-500 mb-1.5">{location}</p>
        22
        {/* Prix */}
        <div className="flex justify-start">
          <PriceTag price={price} size="small" />
        </div>
      </div>
    </div>
  );
};
