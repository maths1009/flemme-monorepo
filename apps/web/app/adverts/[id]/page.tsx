'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  ImageCarouselSection,
  LocationSection,
  RelatedTasksSection,
  SecurityInfoSection,
  SuggestedTasksSection,
  TitleDescriptionSection,
} from '@/components/adverts';
import { ProfileBanner } from '@/components/common'; // Restore import
import { useAnnonce } from '@/hooks/useAnnonces';

export default function AdvertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.id as string;

  // Récupération des données de l'annonce
  const { annonce: advert, loading, error } = useAnnonce(advertId);

  // Mocks pour les tâches suggérées (implémentation backend future)
  const relatedTasks: any[] = [];
  const suggestedTasks: any[] = [];

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Chargement...</div>;
  }

  // Si l'annonce n'existe pas, afficher une erreur
  if (!advert || error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Annonce non trouvée</h1>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full" onClick={() => router.back()}>
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Mapping Backend Data to UI Components
  const mappedUser = {
    avatar: advert.user.profile_picture_url || 'https://placehold.co/100',
    id: advert.user.id,
    name: `${advert.user.firstname} ${advert.user.lastname}`,
    rating: 0, // Not in API yet
    reviews: 0, // Not in API yet
  };

  const images = ['https://placehold.co/600x400']; // Placeholder
  const locationString = `Lat: ${advert.latitude}, Lng: ${advert.longitude}`; // Basic representation

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec carousel d'images */}
      <ImageCarouselSection images={images} title={advert.title} />

      <div className="px-6 py-6">
        {/* Titre et description */}
        <TitleDescriptionSection
          date={advert.created_at}
          description={advert.description}
          price={advert.price}
          title={advert.title}
        />

        {/* Profil utilisateur */}
        <ProfileBanner onMessageClick={() => router.push(`/messages/${advert.id}`)} user={mappedUser} />

        {/* Localisation */}
        <LocationSection advertId={advert.id} location={locationString} />

        {/* Tâches de l'utilisateur */}
        <RelatedTasksSection
          location={locationString}
          onTaskClick={taskId => router.push(`/adverts/${taskId}`)}
          relatedTasks={relatedTasks}
          user={mappedUser}
        />

        {/* Informations de sécurité */}
        <SecurityInfoSection />

        {/* Tâches qui peuvent vous intéresser */}
        <SuggestedTasksSection
          location={locationString}
          onTaskClick={taskId => router.push(`/adverts/${taskId}`)}
          suggestedTasks={suggestedTasks}
        />
      </div>
    </div>
  );
}
