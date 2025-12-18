'use client';

import { PriceTag, ProfileBanner } from '@/components/common';
import { MiniTaskCard } from '@/components/home';
import {
  getAdvertById,
  getRelatedAdverts,
  getSuggestedAdverts,
} from '@/lib/mockData';
import {
  ArrowLeft,
  Clock,
  Heart,
  MoreVertical,
  Shield,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function AdvertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.id as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (scrollContainerRef.current) {
          const scrollLeft = scrollContainerRef.current.scrollLeft;
          const itemWidth = scrollContainerRef.current.clientWidth;
          const index = Math.round(scrollLeft / itemWidth);

          // Force le scroll à aller exactement à l'image
          scrollContainerRef.current.scrollTo({
            left: index * itemWidth,
            behavior: 'smooth',
          });
          setCurrentImageIndex(index);
        }
      }, 50);
    }
  };

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
      <div className="relative px-6 pt-6">
        <div className="relative h-64 w-full rounded-2xl overflow-hidden">
          {/* Conteneur scrollable */}
          <div
            ref={scrollContainerRef}
            className="flex h-full w-full overflow-x-auto scroll-smooth scrollbar-hide"
            onScroll={handleScroll}
          >
            {advert.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${advert.title} - Photo ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Boutons overlay */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 bg-transparent rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </button>

            <button className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Indicateur de photos */}
          <div
            className="absolute bottom-4 right-4 text-white text-sm px-2 py-1"
            style={{
              borderRadius: '39px',
              border: '1px solid rgba(40, 41, 36, 0.50)',
              background: 'rgba(40, 41, 36, 0.50)',
            }}
          >
            {currentImageIndex + 1}/{advert.images.length}
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Titre et description */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {advert.title}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {advert.description}
          </p>

          {/* Prix et date */}
          <div className="flex items-center justify-between">
            <PriceTag price={advert.price} size="medium" />
            <span className="text-gray-500 text-sm">{advert.date}</span>
          </div>
        </div>

        {/* Profil utilisateur */}
        <ProfileBanner
          user={advert.user}
          onMessageClick={() => router.push(`/messages/${advert.id}`)}
        />

        {/* Localisation */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Localisation
            </h2>
            <span className="text-gray-500 text-sm">{advert.location}</span>
          </div>

          {/* Carte placeholder */}
          <div className="h-32 bg-green-100 rounded-xl mb-3 flex items-center justify-center">
            <span className="text-green-600 text-sm">
              Carte - {advert.location}
            </span>
          </div>

          <button
            onClick={() => router.push(`/payment/${advert.id}`)}
            className="w-full bg-gray-800 text-white py-3 rounded-full font-medium hover:bg-gray-900 transition-colors"
          >
            Réserver
          </button>
        </div>

        {/* Informations de sécurité */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Shield className="w-5 h-5" />
            <span>Paiement sécurisé</span>
            <div className="flex space-x-2 ml-auto">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                VISA
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                PayPal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Remboursé dans un délai de 14 jours</span>
          </div>

          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Users className="w-5 h-5" />
            <span>Protection des utilisateurs</span>
          </div>
        </div>

        {/* Tâches de l'utilisateur */}
        {relatedTasks.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  Tâches de
                </h2>
                {advert.user.avatar ? (
                  <Image
                    src={advert.user.avatar}
                    alt={`Avatar de ${advert.user.name}`}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">
                      {advert.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <h2>{advert.user.name}</h2>
              </div>
              <span className="text-gray-500 text-sm">{advert.location}</span>
            </div>

            <div className="flex space-x-3 overflow-x-auto">
              {relatedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex-shrink-0"
                  style={{ width: '120px' }}
                >
                  <MiniTaskCard
                    title={task.title}
                    location={task.location}
                    price={task.price}
                    image={task.image}
                    onClick={() => router.push(`/adverts/${task.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tâches qui peuvent vous intéresser */}
        {suggestedTasks.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Tâches qui peuvent vous intéresser
              </h2>
              <span className="text-gray-500 text-sm">{advert.location}</span>
            </div>

            <div className="flex space-x-3 overflow-x-auto">
              {suggestedTasks.map((task) => (
                <div
                  key={`suggested-${task.id}`}
                  className="flex-shrink-0"
                  style={{ width: '120px' }}
                >
                  <MiniTaskCard
                    title={task.title}
                    location={task.location}
                    price={task.price}
                    image={task.image}
                    onClick={() => router.push(`/adverts/${task.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
