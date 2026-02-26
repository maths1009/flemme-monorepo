'use client';

import { MiniTaskCard } from '@/components/home';
import { Avatar } from '@/components/common/Avatar';
import { useAuth } from '@/context/AuthContext';
import { useAnnonces } from '@/hooks/useAnnonces';
import { AnnoncesService, Annonce } from '@/services/annonces.service';
import { ArrowLeft, ChevronRight, Heart, History, Settings, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [userAdverts, setUserAdverts] = useState<Annonce[]>([]);
  const [loadingAdverts, setLoadingAdverts] = useState(true);

  useEffect(() => {
    const fetchUserAdverts = async () => {
      if (user?.id) {
        try {
          setLoadingAdverts(true);
          setLoadingAdverts(true);
          const response = await AnnoncesService.getAll({ userId: user.id } as any);
          setUserAdverts(response.data);
        } catch (error) {
          console.error('Error fetching user adverts:', error);
        } finally {
          setLoadingAdverts(false);
        }
      }
    };

    fetchUserAdverts();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <p className="text-gray-500">Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      
      <div className="flex items-center px-4 py-4 relative justify-center">
        <button onClick={() => router.back()} className="absolute left-4 p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
        </button>
        <h1 className="text-xl font-bold text-[#1A1A1A]">Profil</h1>
      </div>
      <div className="border-t border-gray-100"></div>

      <div className="bg-[#FDFBF7] px-4 pb-0 mt-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 shadow-sm rounded-full">
               <Avatar
                  src={user.profile_picture_url}
                  alt="Profile"
                  fallback={user.username || user.firstname}
                  size="lg"
                  className="w-16 h-16"
               />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#1A1A1A]">
                {user.username || `${user.firstname} ${user.lastname}`}
              </h2>
            </div>
          </div>
          
          <div className="relative w-24 h-24 -mt-4 -mr-4">
             <Image
               src="/images/profile/profileIllustration.svg"
               alt="Illustration"
               width={100}
               height={100}
               className="object-contain"
             />
          </div>
        </div>
      </div>

      <div className="flex flex-col border-t border-gray-100">
        <MenuItem icon={Star} label="Mes avis" onClick={() => router.push('/feedback')} />
        <MenuItem icon={Heart} label="Favoris" onClick={() => router.push('/favorites')} />
        <MenuItem icon={Settings} label="Paramètres" onClick={() => router.push('/profile/settings')} />
        <MenuItem icon={History} label="Historique de mes annonces" />
      </div>

      <div className="mt-14 px-4">
        <h3 className="text-xl font-bold text-gray-400 mb-6">Mes annonces</h3>
        
        {loadingAdverts ? (
          <p className="text-sm text-gray-400">Chargement de vos annonces...</p>
        ) : userAdverts.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
            {userAdverts.map((advert) => (
              <div key={advert.id} className="flex-shrink-0 w-[160px]">
                 <MiniTaskCard
                   title={advert.title}
                   location=""
                   price={advert.price}
                   image={`https://picsum.photos/seed/${advert.id}/600/400`}
                   onClick={() => router.push(`/adverts/${advert.id}`)}
                 />
              </div>
            ))}
          </div>
        ) : (
           <p className="text-sm text-gray-400">Vous n&apos;avez aucune annonce en ligne.</p>
        )}
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string, onClick?: () => void }) {
    return (
        <button onClick={onClick} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
            <Icon className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1.5} />
            <span className="flex-1 text-left text-base font-medium text-[#1A1A1A]">{label}</span>
        </button>
    );
}
