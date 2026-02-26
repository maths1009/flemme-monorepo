'use client';

import { getAdvertById } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function DirectionsPage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.advertId as string;

  const advert = getAdvertById(advertId);

  if (!advert) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-gray-500">Annonce non trouvée</p>
      </div>
    );
  }

  const handleContinue = () => {
    
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col px-6 py-8">
      
      <div className="text-center mb-8">
        <h1
          className="font-bold text-foreground mb-4"
          style={{ fontSize: '3.5rem', lineHeight: '1.1' }}
        >
          Ya plus qu'à !
        </h1>
        <h2 className="text-xl font-medium text-foreground">
          Comment vous y rendre
        </h2>
      </div>

      {/* Localisation */}
      <div className="flex-1 mb-8">
        <div className="rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3"></div>

          {/* Carte placeholder */}
          <div className="h-48 bg-green-100 rounded-xl mb-3 flex items-center justify-center">
            <span className="text-green-600 text-sm">
              Carte - {advert.location}
            </span>
          </div>
        </div>
      </div>

      {/* Bouton de continuation */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleContinue}
          className="w-16 h-16 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#4E77CF' }}
        >
          <ArrowRight className="w-8 h-8 text-foreground" strokeWidth={3} />
        </button>
      </div>

      {/* Illustration en bas */}
      <div className="flex justify-center">
        <Image
          src="/images/payement/success-payment.png"
          alt="Illustration"
          width={260}
          height={201}
          className="w-48 h-auto object-contain"
        />
      </div>
    </div>
  );
}
