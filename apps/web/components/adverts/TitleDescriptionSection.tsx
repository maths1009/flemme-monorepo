'use client';

import { PriceTag } from '@/components/common';
import * as React from 'react';

interface TitleDescriptionSectionProps {
  title: string;
  description: string;
  price: number;
  date: string;
}

export const TitleDescriptionSection: React.FC<
  TitleDescriptionSectionProps
> = ({ title, description, price, date }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{title}</h1>
      <p className="text-gray-600 text-base leading-relaxed mb-4">
        {description}
      </p>

      {/* Prix et date */}
      <div className="flex items-center justify-between">
        <PriceTag price={price} size="medium" />
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
    </div>
  );
};
