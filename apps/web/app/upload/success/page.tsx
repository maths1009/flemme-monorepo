'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/'); // Rediriger vers la page d'accueil
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 text-center bg-white">
      {/* Illustration de succès */}
      <div className="mb-8">
        <Image
          src="/images/upload/illustration.svg"
          alt="Illustration de succès"
          width={200}
          height={200}
          className="w-48 h-48"
        />
      </div>

      {/* Message de succès */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">C'est parfait !</h1>
        <h2 className="text-4xl font-bold text-black">
          L'annonce a été publiée.
        </h2>
      </div>

      {/* Bouton de fermeture */}
      <button
        onClick={handleClose}
        className="w-16 h-16 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
        style={{ backgroundColor: '#4E77CF' }}
      >
        <ArrowRight
          className="w-8 h-8"
          style={{ color: '#282924' }}
          strokeWidth={4}
        />
      </button>
    </div>
  );
}
