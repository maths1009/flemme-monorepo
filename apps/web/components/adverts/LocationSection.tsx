'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

interface LocationSectionProps {
  advertId: string;
  location: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  advertId,
  location,
}) => {
  const router = useRouter();

  const handleReserve = () => {
    router.push(`/payment/${advertId}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Localisation</h2>
        <span className="text-gray-500 text-sm">{location}</span>
      </div>

      {/* Carte placeholder */}
      <div className="h-32 bg-green-100 rounded-xl mb-3 flex items-center justify-center">
        <span className="text-green-600 text-sm">Carte - {location}</span>
      </div>

      <button
        onClick={handleReserve}
        className="w-full bg-gray-800 text-white py-3 rounded-full font-medium hover:bg-gray-900 transition-colors"
      >
        Réserver
      </button>
    </div>
  );
};
