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
import { ProfileBanner } from '@/components/common';
import { useAuth } from '@/context/AuthContext';
import { useAnnonce } from '@/hooks/useAnnonces';
import { useLikes } from '@/hooks/useLikes';
import { AnnoncesService } from '@/services/annonces.service';

export default function AdvertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.id as string;
  const { user } = useAuth();

  const { annonce: advert, loading, error } = useAnnonce(advertId);
  const { checkIsLiked, toggleLike } = useLikes();

  const isOwner = user && advert ? user.id === advert.user.id : false;

  const handleEdit = () => {
    
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
          text: `Découvrez cette tâche : ${advert?.title}`,
          title: advert?.title,
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

  const relatedTasks: any[] = [];
  const suggestedTasks: any[] = [];

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Chargement...</div>;
  }

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

  const mappedUser = {
    avatar: advert.user.profile_picture_url || '',
    id: advert.user.id,
    name: `${advert.user.firstname} ${advert.user.lastname}`,
    rating: 0,
    reviews: 0,
  };

  const images = ['https://placehold.co/600x400'];
  const locationString = `Lat: ${advert.latitude}, Lng: ${advert.longitude}`;

  const { isLiked } = checkIsLiked(advert.id);

  return (
    <div className="min-h-screen bg-white">
      
      <ImageCarouselSection
        images={images}
        isLiked={isLiked}
        isOwner={isOwner}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onLikeToggle={() => toggleLike(advert.id)}
        onShare={handleShare}
        title={advert.title}
      />

      <div className="px-6 py-6">
        
        <TitleDescriptionSection
          date={`le ${new Date(advert.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}`}
          description={advert.description}
          price={advert.price}
          title={advert.title}
        />

        <ProfileBanner onMessageClick={() => router.push(`/messages/${advert.id}`)} user={mappedUser} />

        <LocationSection
          advertId={advert.id}
          coordinates={{
            lat: advert.latitude,
            lng: advert.longitude,
          }}
        />

        <RelatedTasksSection
          location={locationString}
          onTaskClick={taskId => router.push(`/adverts/${taskId}`)}
          relatedTasks={relatedTasks}
          user={mappedUser}
        />

        <SecurityInfoSection />

        <SuggestedTasksSection
          location={locationString}
          onTaskClick={taskId => router.push(`/adverts/${taskId}`)}
          suggestedTasks={suggestedTasks}
        />
      </div>
    </div>
  );
}
