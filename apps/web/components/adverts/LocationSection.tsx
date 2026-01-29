'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import type * as React from 'react';

// Import dynamique du composant Carte complet pour désactiver le SSR
const LocationMap = dynamic(() => import('./LocationMap'), {
  loading: () => (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
      Chargement de la carte...
    </div>
  ),
  ssr: false,
});

interface LocationSectionProps {
  advertId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const LocationSection: React.FC<LocationSectionProps> = ({ advertId, coordinates }) => {
  const router = useRouter();

  const handleReserve = () => {
    router.push(`/payment/${advertId}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Localisation</h2>
      </div>

      <div className="h-64 rounded-xl mb-3 overflow-hidden border border-gray-100 shadow-sm relative z-0">
        <LocationMap coordinates={coordinates} />
      </div>

      <button
        className="w-full bg-gray-800 text-white py-3 rounded-full font-medium hover:bg-gray-900 transition-colors"
        onClick={handleReserve}
      >
        Réserver
      </button>
    </div>
  );
};
