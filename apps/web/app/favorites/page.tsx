'use client';

import { MiniTaskCard } from '@/components/home/MiniTaskCard';
import { fetchClient } from '@/lib/api';
import { Header } from '@/components/common/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LikeDto {
  id: string;
  created_at: string;
  annonce: {
    id: string;
    title: string;
    description: string;
    price: number;
    latitude?: number;
    longitude?: number;
    photos: { url: string }[];
  };
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

import { useAuth } from '@/context/AuthContext';

export default function FavoritesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [likes, setLikes] = useState<LikeDto[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLikes = async () => {
      if (!user?.id) return;
      try {
        const response = await fetchClient<PaginatedResponse<LikeDto>>(`/likes?user_id=${user.id}`);
        if (response && response.data) {
          setLikes(response.data);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      <Header title="Favoris" onBack={() => router.push('/profile')} />

      <div className="px-4 py-6">
        <h2 className="text-xl font-medium text-gray-400 mb-6">Mes favoris</h2>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Chargement...</p>
          </div>
        ) : likes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 mb-4">Vous n'avez aucun favori pour le moment.</p>
            <Link href="/" className="text-primary font-medium hover:underline">
              Explorer les annonces
            </Link>
          </div>
        ) : (
          /* Liste horizontale scrollable comme dans la maquette (on devine le scroll horizontal ou une grille) */
          /* La maquette montre 3 items coupés à droite -> overflow-x-auto + flex */
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide">
            {likes.map((like) => {
              const annonce = like.annonce;
              if (!annonce) return null;
              
              // Image par défaut si pas de photo
              const image = annonce?.photos && annonce.photos.length > 0
                ? annonce.photos[0]?.url ?? '/images/mock/150.jpeg'
                : '/images/mock/150.jpeg';

              const location = annonce.latitude && annonce.longitude
                ? `Angers (49000)` // Mock location name as coordinates are not user friendly
                : 'Localisation inconnue';

              return (
                <div key={like.id} className="flex-shrink-0">
                  <MiniTaskCard
                    title={annonce.title}
                    location={location}
                    price={annonce.price}
                    image={image}
                    onClick={() => router.push(`/adverts/${annonce.id}`)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
