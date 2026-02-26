'use client';

import * as React from 'react';
import { PriceTag } from '@/components/common/PriceTag';

interface OfferMessageProps {
  originalPrice: number;
  proposedPrice: number;
  status?: 'pending' | 'accepted' | 'refused';
  onAccept?: () => void;
  onRefuse?: () => void;
  onMakeOffer?: () => void;
}

export const OfferMessage: React.FC<OfferMessageProps> = ({
  originalPrice,
  proposedPrice,
  status = 'pending',
  onAccept,
  onRefuse,
  onMakeOffer,
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'accepted':
        return 'Acceptée';
      case 'refused':
        return 'Refusée';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'accepted':
        return 'text-green-600';
      case 'refused':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div
      className="border border-gray-800 text-gray-800 max-w-xs"
      style={{
        borderRadius: '4px',
        padding: '12px 18px',
      }}
    >
      <div className="space-y-3">
        <div>
          <div className="flex items-baseline space-x-2">
            <PriceTag price={proposedPrice} size="medium" />
            <span className="text-sm text-gray-500 line-through">
              {originalPrice.toFixed(2)} €
            </span>
          </div>
          <p className={`text-sm mt-1 ${getStatusColor()}`}>
            {getStatusText()}
          </p>
        </div>

        {status === 'pending' && (
          <div className="space-y-2">
            <button
              onClick={onAccept}
              className="w-full text-white py-2 px-4 rounded text-sm font-medium"
              style={{ backgroundColor: '#4E77CF' }}
            >
              Accepter
            </button>
            <button
              onClick={onRefuse}
              className="w-full border border-gray-800 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-50"
            >
              Refuser
            </button>
            <button
              onClick={onMakeOffer}
              className="w-full border border-gray-800 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-50"
            >
              Faire une offre
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
