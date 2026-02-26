'use client';

import { FeedbackList } from '@/components/feedback';
import { MiniTaskCard } from '@/components/home';
import { ProfileTabs } from '@/components/profile';
import { fetchClient } from '@/lib/api';
import { AnnoncesService, Annonce } from '@/services/annonces.service';
import { ArrowLeft, Star } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface PublicUser {
  id: string;
  firstname: string;
  lastname: string;
  username?: string;
  profile_picture_url?: string;
  score: number;
  average_response_time: number;
}

interface Feedback {
  id: string;
  rating: number;
  message: string;
  created_at: string;
  sender: PublicUser;
}

const TABS = [
  { id: 'annonces', label: 'Annonces' },
  { id: 'evaluations', label: 'Évaluations' },
];

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [activeTab, setActiveTab] = useState('annonces');
  const [user, setUser] = useState<PublicUser | null>(null);
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAnnonces, setLoadingAnnonces] = useState(false);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await fetchClient(`/users/${userId}`);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        setLoadingAnnonces(true);
        const response = await AnnoncesService.getAll({ userId } as any);
        setAnnonces(response.data);
      } catch (error) {
        console.error('Error fetching annonces:', error);
      } finally {
        setLoadingAnnonces(false);
      }
    };

    if (activeTab === 'annonces' && annonces.length === 0 && user) {
      fetchAnnonces();
    }
  }, [activeTab, userId, annonces.length, user]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoadingFeedbacks(true);
        const data = await fetchClient(`/feedbacks?receiver_id=${userId}`);
        setFeedbacks(data.data || []);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoadingFeedbacks(false);
      }
    };

    if (activeTab === 'evaluations' && feedbacks.length === 0 && user) {
      fetchFeedbacks();
    }
  }, [activeTab, userId, feedbacks.length, user]);

  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0';

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Chargement du profil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Utilisateur non trouvé</h1>
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

  const displayName = user.username || `${user.firstname} ${user.lastname}`;

  return (
    <div className="min-h-screen bg-white">
      
      <div className="flex items-center px-4 py-4 relative justify-center border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="absolute left-4 p-2"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{displayName}</h1>
      </div>

      <ProfileTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="p-4">
        
        {activeTab === 'annonces' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Tâches de</h2>
              {user.profile_picture_url ? (
                <Image
                  src={user.profile_picture_url}
                  alt={displayName}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-500">
                    {user.firstname.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-gray-600">{displayName}</span>
            </div>

            {loadingAnnonces ? (
              <p className="text-sm text-gray-400">Chargement des annonces...</p>
            ) : annonces.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {annonces.map((annonce) => (
                  <MiniTaskCard
                    key={annonce.id}
                    title={annonce.title}
                    location={
                      annonce.latitude && annonce.longitude
                        ? `${Number(annonce.latitude).toFixed(2)}, ${Number(annonce.longitude).toFixed(2)}`
                        : 'Localisation non définie'
                    }
                    price={annonce.price}
                    image={`https://picsum.photos/seed/${annonce.id}/600/400`}
                    onClick={() => router.push(`/adverts/${annonce.id}`)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Aucune annonce pour le moment.</p>
            )}
          </div>
        )}

        {activeTab === 'evaluations' && (
          <div>
            
            <div className="text-center py-4 border-b border-gray-100 mb-4">
              <div className="text-3xl font-bold text-gray-800">{averageRating}</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(Number(averageRating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">({feedbacks.length})</div>
            </div>

            <FeedbackList
              feedbacks={feedbacks}
              loading={loadingFeedbacks}
              onAuthorClick={(authorId) => router.push(`/profile/${authorId}`)}
            />
          </div>
        )}

      </div>
    </div>
  );
}
