'use client';

import { Navbar } from '@/components/common';
import { ApplicationPanel, Carousel, MiniTaskCard } from '@/components/home';
import { getAllAdverts } from '@/lib/mockData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const adverts = getAllAdverts();

  return (
    <div className="min-h-screen">
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
          <button
            onClick={() => router.push('/search')}
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
            <span className="flex-1 text-left text-white opacity-75">
              Trouver des tâches
            </span>
          </button>
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

        {/* Carousel horizontal de mini cards */}
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {adverts.slice(0, 5).map((advert) => (
              <MiniTaskCard
                key={advert.id}
                title={advert.title}
                location={advert.location}
                price={advert.price}
                image={advert.image}
                onClick={() => router.push(`/adverts/${advert.id}`)}
              />
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {adverts.slice(6, 10).map((advert) => (
              <MiniTaskCard
                key={advert.id}
                title={advert.title}
                location={advert.location}
                price={advert.price}
                image={advert.image}
                onClick={() => router.push(`/adverts/${advert.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Espace pour d'autres contenus futurs */}
      </div>
    </div>
  );
};

export default Page;
