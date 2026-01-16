'use client';

import * as React from 'react';

interface PriceTagProps {
  price: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  size = 'medium',
  className = '',
  style = {},
}) => {
  const sizeClasses = {
    small: 'px-1.5 py-0.5 text-xs',
    medium: 'px-3 py-2 text-base',
    large: 'px-4 py-3 text-lg',
  };

  return (
    <span
      className={`font-semibold text-white ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: '#4E77CF',
        border: '1px solid #739BF2',
        borderRadius: '4px',
        ...style,
      }}
    >
      {price}€
    </span>
  );
};
