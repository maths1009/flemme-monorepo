'use client';

import {
  ImageCarouselSection,
  LocationSection,
  RelatedTasksSection,
  SecurityInfoSection,
  SuggestedTasksSection,
  TitleDescriptionSection,
} from '@/components/adverts';
import { ProfileBanner } from '@/components/common';
import {
  getAdvertById,
  getRelatedAdverts,
  getSuggestedAdverts,
} from '@/lib/mockData';
import { useParams, useRouter } from 'next/navigation';

export default function AdvertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.id as string;

  // Récupération des données de l'annonce
  const advert = getAdvertById(advertId);
  const relatedTasks = getRelatedAdverts(advertId, 3);
  const suggestedTasks = getSuggestedAdverts(advertId, 3);

  // Si l'annonce n'existe pas, afficher une erreur
  if (!advert) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Annonce non trouvée
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-800 text-white px-6 py-2 rounded-full"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec carousel d'images */}
      <ImageCarouselSection images={advert.images} title={advert.title} />

      <div className="px-6 py-6">
        {/* Titre et description */}
        <TitleDescriptionSection
          title={advert.title}
          description={advert.description}
          price={advert.price}
          date={advert.date}
        />

        {/* Profil utilisateur */}
        <ProfileBanner
          user={advert.user}
          onMessageClick={() => router.push(`/messages/${advert.id}`)}
        />

        {/* Localisation */}
        <LocationSection advertId={advert.id} location={advert.location} />

        {/* Tâches de l'utilisateur */}
        <RelatedTasksSection
          user={advert.user}
          location={advert.location}
          relatedTasks={relatedTasks}
          onTaskClick={(taskId) => router.push(`/adverts/${taskId}`)}
        />

        {/* Informations de sécurité */}
        <SecurityInfoSection />

        {/* Tâches qui peuvent vous intéresser */}
        <SuggestedTasksSection
          location={advert.location}
          suggestedTasks={suggestedTasks}
          onTaskClick={(taskId) => router.push(`/adverts/${taskId}`)}
        />
      </div>
    </div>
  );
}
