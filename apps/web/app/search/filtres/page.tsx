'use client';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

function FilterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = React.useState('0');
  const [maxPrice, setMaxPrice] = React.useState('0');

  const existingFilters = searchParams.get('filters')
    ? JSON.parse(decodeURIComponent(searchParams.get('filters')!))
    : {};

  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string[]>
  >(existingFilters || {});

  const filterGroups = [
    {
      name: 'Disponibilité',
      filters: [
        'Disponible maintenant',
        'Demain',
        'Cette semaine',
        'Ce mois-ci',
        'Flexible',
      ],
    },
    {
      name: 'Distance',
      filters: ['Moins de 1km', '1-5km', '5-10km', '10-20km', 'Plus de 20km'],
    },
    {
      name: 'Note',
      filters: [
        '5 étoiles',
        '4+ étoiles',
        '3+ étoiles',
        '2+ étoiles',
        'Toutes',
      ],
    },
  ];

  const handleFilterToggle = (group: string, filter: string) => {
    setSelectedFilters((prev) => {
      const groupFilters = prev[group] || [];
      if (groupFilters.includes(filter)) {
        return {
          ...prev,
          [group]: groupFilters.filter((f) => f !== filter),
        };
      } else {
        return {
          ...prev,
          [group]: [...groupFilters, filter],
        };
      }
    });
  };

  const handleApplyFilters = () => {
    const filtersPayload = {
      ...selectedFilters,
      priceRange:
        minPrice !== '0' || maxPrice !== '0'
          ? { min: minPrice, max: maxPrice }
          : undefined,
    };

    const filtersString = encodeURIComponent(JSON.stringify(filtersPayload));
    router.push(`/search?filters=${filtersString}`);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <button onClick={handleClose} className="p-2">
          <X className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Filtres</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-6 pb-32">
        
        {filterGroups.map((group) => (
          <div key={group.name} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {group.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {group.filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterToggle(group.name, filter)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    selectedFilters[group.name]?.includes(filter)
                      ? 'bg-blue-100 border-blue-500 text-blue-800'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Prix</h2>
          <div className="flex items-end gap-2 min-w-0">
            <div className="flex-1 min-w-0">
              <label className="block text-xs text-gray-600 mb-2">Min.</label>
              <div className="flex items-center bg-gray-800 text-white rounded-full px-3 py-2">
                <span className="text-sm mr-1 flex-shrink-0">€</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-white text-sm min-w-0"
                  placeholder="0"
                />
              </div>
            </div>
            <span className="text-gray-600 mb-2 text-sm flex-shrink-0">-</span>
            <div className="flex-1 min-w-0">
              <label className="block text-xs text-gray-600 mb-2">max.</label>
              <div className="flex items-center bg-gray-800 text-white rounded-full px-3 py-2">
                <span className="text-sm mr-1 flex-shrink-0">€</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-white text-sm min-w-0"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white px-6 py-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-gray-800 text-white rounded-full py-3 font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
        >
          Trouver des tâches
        </button>
      </div>
    </div>
  );
}

export default function FilterPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white" />}>
      <FilterPageContent />
    </React.Suspense>
  );
}
