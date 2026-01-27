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
import { useAuth } from '@/context/AuthContext';
import { AnnoncesService } from '@/services/annonces.service';
import { useAnnonce } from '@/hooks/useAnnonces';
import { useLikes } from '@/hooks/useLikes';

export default function AdvertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.id as string;
  const { user } = useAuth();
  
  // Récupération des données de l'annonce
  const { annonce: advert, loading, error } = useAnnonce(advertId);
  const { checkIsLiked, toggleLike } = useLikes();

  const isOwner = user && advert ? user.id === advert.user.id : false;

  const handleEdit = () => {
    // Navigate to edit page (to be implemented)
    router.push(`/adverts/${advertId}/edit`);
  };

  const handleDelete = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await AnnoncesService.delete(advertId);
        router.push('/');
      } catch (err) {
        console.error('Failed to delete advert', err);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: advert?.title,
          text: `Découvrez cette tâche : ${advert?.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papier !');
      }
    } catch (err) {
        console.error('Share failed', err);
    }
  };

  // Mocks pour les tâches suggérées (implémentation backend future)
  const relatedTasks: any[] = [];
  const suggestedTasks: any[] = [];

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Chargement...</div>;
  }

  // Si l'annonce n'existe pas, afficher une erreur
  if (!advert || error) {
    // ... (unchanged)
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
  
  // Check like status
  const { isLiked } = checkIsLiked(advert.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec carousel d'images */}
      <ImageCarouselSection 
        images={images} 
        title={advert.title}
        isLiked={isLiked}
        onLikeToggle={() => toggleLike(advert.id)}
        isOwner={isOwner}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onShare={handleShare}
      />

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
