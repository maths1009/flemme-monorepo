'use client';

import { PriceTag } from '@/components/common';
import { getAllAdverts } from '@/lib/mockData';
import Link from 'next/link';

export default function AdvertsListPage() {
  const adverts = getAllAdverts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Liste des annonces
        </h1>

        <div className="space-y-4">
          {adverts.map((advert) => (
            <Link
              key={advert.id}
              href={`/adverts/${advert.id}`}
              className="block"
            >
              <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {advert.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {advert.location} • {advert.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <PriceTag price={advert.price} size="small" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
