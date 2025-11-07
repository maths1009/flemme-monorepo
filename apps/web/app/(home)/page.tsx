'use client';

import { Navbar } from '@/components/common';
import { ApplicationPanel, Carousel, MiniTaskCard } from '@/components/home';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Salutation */}
      <div className="px-6 mb-6">
        <h2 className="text-4xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">👋</span>
          Olivier,
        </h2>
        <p className="text-xl text-gray-800 mt-2 font-medium">
          Envie de chill ?
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center bg-foreground rounded-full px-4 py-3 mr-6 text-foreground"
            style={{ width: '70%' }}
          >
            <Image
              src="/images/home/searchbarLogo.svg"
              alt="Recherche"
              width={18}
              height={18}
              className="w-5 h-5 mr-3"
            />
            <input
              type="text"
              placeholder="Trouver des tâches"
              className="flex-1 bg-transparent text-white placeholder-gray-300 outline-none"
            />
          </div>
          <button className="text-gray-600 text-sm underline whitespace-nowrap">
            Historique
          </button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel />

      {/* Panneau "Notre application est là" */}
      <ApplicationPanel />

      {/* Section Dernières tâches */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Dernières tâches proche de chez moi
        </h2>

        {/* Grille de mini cards */}
        <div className="flex flex-wrap gap-2">
          <MiniTaskCard
            title="Acheter du beurre"
            location="Angers (49000)"
            price={5}
            image="/images/home/mock/image.png"
            onClick={() => console.log('Clic sur: Acheter du beurre')}
          />
          <MiniTaskCard
            title="Nettoyer ma voiture"
            location="Angers (49000)"
            price={20}
            image="/images/home/mock/image.png"
            onClick={() => console.log('Clic sur: Nettoyer ma voiture')}
          />
          <MiniTaskCard
            title="Déjeuner avec moi"
            location="Angers (49000)"
            price={8}
            image="/images/home/mock/image.png"
            onClick={() => console.log('Clic sur: Déjeuner avec moi')}
          />
          <MiniTaskCard
            title="Acheter du beurre"
            location="Angers (49000)"
            price={5}
            image="/images/home/mock/image.png"
            onClick={() => console.log('Clic sur: Acheter du beurre 2')}
          />
          <MiniTaskCard
            title="Nettoyer ma voiture"
            location="Angers (49000)"
            price={20}
            image="/images/home/mock/image.png"
            onClick={() => console.log('Clic sur: Nettoyer ma voiture 2')}
          />
          <MiniTaskCard
            title="Déjeuner avec moi"
            location="Angers (49000)"
            price={8}
            image="/images/home/mock/image.png"
            onClick={() => console.log('Clic sur: Déjeuner avec moi 2')}
          />
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Espace pour d'autres contenus futurs */}
      </div>
    </div>
  );
};

export default Page;
