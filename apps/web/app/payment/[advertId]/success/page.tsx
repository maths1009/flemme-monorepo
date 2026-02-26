'use client';

import { getAdvertById } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.advertId as string;

  const advert = getAdvertById(advertId);

  if (!advert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Annonce non trouvée</p>
      </div>
    );
  }

  const handleContinue = () => {
    
    router.push(`/payment/${advertId}/directions`);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6">
      
      <div className="mb-12">
        <Image
          src="/images/payement/success-payment.png"
          alt="Illustration de succès"
          width={260}
          height={201}
          className="w-64 h-64 object-contain"
        />
      </div>

      <div className="text-center mb-12 max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          Hop, <span style={{ color: '#4E77CF' }}>{advert.user.name}</span> s'en
          occupe ! Maintenant,{' '}
          <span style={{ color: '#4E77CF' }}>détends-toi.</span>
        </h1>
      </div>

      {/* Bouton de continuation */}
      <button
        onClick={handleContinue}
        className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
        style={{ backgroundColor: '#4E77CF' }}
      >
        <ArrowRight className="w-8 h-8 text-foreground" strokeWidth={3} />
      </button>
    </div>
  );
}
