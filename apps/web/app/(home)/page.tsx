'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/common';
import { ApplicationPanel, Carousel, MiniTaskCard } from '@/components/home';
import { useAuth } from '@/context/AuthContext';
import { getAllAdverts } from '@/lib/mockData';

const Page = () => {
  const router = useRouter();
  const adverts = getAllAdverts();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Salutation */}
      <div className="px-6 mb-6">
        <h2 className="text-4xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">👋</span>
          {user?.firstname},
        </h2>
        <p className="text-xl text-gray-800 mt-2 font-medium">Envie de chill ?</p>
      </div>

      {/* Barre de recherche */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center bg-foreground rounded-full px-4 py-3 mr-6 text-foreground"
            onClick={() => router.push('/search')}
            style={{ width: '70%' }}
          >
            <Image
              alt="Recherche"
              className="w-5 h-5 mr-3"
              height={18}
              src="/images/home/searchbarLogo.svg"
              width={18}
            />
            <span className="flex-1 text-left text-white opacity-75">Trouver des tâches</span>
          </button>
          <button className="text-gray-600 text-sm underline whitespace-nowrap">Historique</button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel />

      {/* Panneau "Notre application est là" */}
      <ApplicationPanel />

      {/* Section Dernières tâches */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Dernières tâches proche de chez moi</h2>

        {/* Carousel horizontal de mini cards */}
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {adverts.slice(0, 5).map(advert => (
              <MiniTaskCard
                image={advert.image}
                key={advert.id}
                location={advert.location}
                onClick={() => router.push(`/adverts/${advert.id}`)}
                price={advert.price}
                title={advert.title}
              />
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {adverts.slice(6, 10).map(advert => (
              <MiniTaskCard
                image={advert.image}
                key={advert.id}
                location={advert.location}
                onClick={() => router.push(`/adverts/${advert.id}`)}
                price={advert.price}
                title={advert.title}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4">{/* Espace pour d'autres contenus futurs */}</div>
    </div>
  );
};

export default Page;
