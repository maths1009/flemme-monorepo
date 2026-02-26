'use client';

import { PriceTag } from '@/components/common/PriceTag';
import { getAllAdverts } from '@/lib/mockData';
import { ArrowLeft, Filter, Search, List, Map as MapIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import dynamic from 'next/dynamic';

import { Header } from '@/components/common/Header';
import { Annonce, AnnoncesService } from '@/services/annonces.service';

const Map = dynamic(() => import('@/components/common/Map'), {
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />,
  ssr: false,
});

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showMap, setShowMap] = React.useState(false);
  const [realAdverts, setRealAdverts] = React.useState<Annonce[]>([]);
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (showMap) {
      setIsLoading(true);
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            
            try {
              
              const response = await AnnoncesService.getAll({
                latitude,
                longitude,
                distance: 20
              });
              setRealAdverts(response.data);
            } catch (error) {
              console.error('Error fetching nearby adverts:', error);
            } finally {
              setIsLoading(false);
            }
          },
          async (error) => {
            console.warn('Geolocation error or denied:', error);
            
            try {
              const response = await AnnoncesService.getAll();
              setRealAdverts(response.data);
            } catch (err) {
              console.error('Error fetching adverts:', err);
            } finally {
              setIsLoading(false);
            }
          }
        );
      } else {
        
        const fetchAll = async () => {
          try {
            const response = await AnnoncesService.getAll();
            setRealAdverts(response.data);
          } catch (error) {
            console.error('Error fetching adverts:', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchAll();
      }
    }
  }, [showMap]);

  const selectedCategory = searchParams.get('category');

  const allAdverts = getAllAdverts();

  const categories: Category[] = [
    {
      id: 'paperasse',
      name: 'Paperasse',
      description: 'Pour tout les papiers bien relou !',
      icon: '/images/search/file-category.png',
    },
    {
      id: 'course',
      name: 'Course',
      description: "Quand t'as faim mais t'as pas envie de bouger tes pieds",
      icon: '/images/search/cart-category.png',
    },
    {
      id: 'paperasse2',
      name: 'Paperasse',
      description: 'Pour tout les papiers bien relou !',
      icon: '/images/search/file-category.png',
    },
    {
      id: 'paperasse3',
      name: 'Paperasse',
      description: 'Pour tout les papiers bien relou !',
      icon: '/images/search/file-category.png',
    },
    {
      id: 'paperasse4',
      name: 'Paperasse',
      description: 'Pour tout les papiers bien relou !',
      icon: '/images/search/file-category.png',
    },
    {
      id: 'paperasse5',
      name: 'Paperasse',
      description: 'Pour tout les papiers bien relou !',
      icon: '/images/search/file-category.png',
    },
    {
      id: 'paperasse6',
      name: 'Paperasse',
      description: 'Pour tout les papiers bien relou !',
      icon: '/images/search/file-category.png',
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    
    router.push(`/search?category=${categoryId}`);
  };

  const handleBackToCategories = () => {
    
    router.push('/search');
  };

  const getFilteredAdverts = () => {
    if (!selectedCategory) return [];

    const categoryMapping: Record<string, string> = {
      paperasse: 'paperasse',
      course: 'courses',
      
    };

    const advertCategory = categoryMapping[selectedCategory];
    if (!advertCategory) return allAdverts;

    return allAdverts.filter((advert) => advert.category === advertCategory);
  };

  const filteredAdverts = getFilteredAdverts();

  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.name : 'Catégorie';
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      
      console.log('Recherche:', searchQuery);
    }
  };

  if (showMap) {
    const markers = realAdverts
      .filter((ad) => ad.latitude && ad.longitude)
      .map((ad) => ({
        lat: Number(ad.latitude),
        lng: Number(ad.longitude),
        title: ad.title,
        image: ad.photos?.[0]?.url || `https://picsum.photos/seed/${ad.id}/100/100`,
        id: ad.id,
      }));

    return (
      <div className="min-h-screen bg-primary flex flex-col h-screen">
        <Header
          title="Carte"
          onBack={() => setShowMap(false)}
          variant="search"
          className="pt-8"
        />
        <div className="flex-1 overflow-hidden relative rounded-t-3xl bg-gray-50 flex flex-col">
          {userLocation && realAdverts.length === 0 && !isLoading && (
             <div className="bg-orange-50 text-orange-800 px-4 py-3 text-sm font-medium text-center border-b border-orange-100 relative z-10">
               Aucune annonce n'a été trouvée dans un rayon de 20km autour de vous
             </div>
          )}
          <div className="flex-1 w-full relative">
            <Map
              markers={markers}
              coordinates={userLocation}
              popupText="Ma position"
            />
          </div>
        </div>
      </div>
    );
  }

  // Si une catégorie est sélectionnée, afficher les annonces filtrées
  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-primary">
        <Header
          title={getCategoryName()}
          onBack={handleBackToCategories}
          variant="search"
          className="pt-8"
        />
        <div className="px-6 pb-8">

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative">
            <div className="flex items-center bg-foreground rounded-full px-4 py-3">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher dans cette catégorie"
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
        </div>

        {/* Titre "Filtres" - seulement si des annonces sont trouvées */}
        {filteredAdverts.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => {
                const filters = searchParams.get('filters');
                router.push(
                  `/search/filtres${filters ? `?filters=${filters}` : ''}`,
                );
              }}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Filter className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-600">Filtres</h2>
            </button>

            {/* Afficher les filtres sélectionnés sous forme de tags */}
            {searchParams.get('filters') && (
              <div className="mt-3 flex flex-wrap gap-2">
                {(() => {
                  try {
                    const filters = JSON.parse(
                      decodeURIComponent(searchParams.get('filters')!),
                    );
                    const tags: string[] = [];

                    // Collecte tous les filtres sélectionnés
                    Object.entries(filters).forEach(([key, value]) => {
                      if (key !== 'priceRange' && Array.isArray(value)) {
                        tags.push(...value);
                      }
                    });

                    // Ajouter la plage de prix si présente
                    if (filters.priceRange) {
                      if (
                        filters.priceRange.min &&
                        filters.priceRange.min !== '0'
                      ) {
                        tags.push(`Min: ${filters.priceRange.min}€`);
                      }
                      if (
                        filters.priceRange.max &&
                        filters.priceRange.max !== '0'
                      ) {
                        tags.push(`Max: ${filters.priceRange.max}€`);
                      }
                    }

                    return tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ));
                  } catch {
                    return null;
                  }
                })()}
              </div>
            )}
          </div>
        )}

        {/* Liste des annonces */}
        <div className="space-y-4">
          {filteredAdverts.length > 0 ? (
            filteredAdverts.map((advert) => (
              <div
                key={advert.id}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <Image
                    src={advert.image}
                    alt={advert.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {advert.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {advert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {advert.location}
                      </span>
                      <div className="bg-transparent">
                        <PriceTag price={advert.price} size="small" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Aucune annonce trouvée dans cette catégorie
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  }

  // Affichage par défaut : liste des catégories
  return (
    <div className="min-h-screen bg-primary">
      <Header
        title="Recherche"
        onBack={() => router.push('/')}
        variant="search"
        className="pt-8"
      />
      
      <div className="px-6 pb-8">
        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative">
            <div className="flex items-center bg-foreground rounded-full px-4 py-3">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Trouver des tâches"
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
        </div>

        {/* Titre "Voir la carte" */}
        <button
          onClick={() => setShowMap(true)}
          className="mb-6 w-full text-left"
        >
          <h2 className="text-lg font-medium text-gray-600 hover:text-gray-800 transition-colors">Voir la carte</h2>
        </button>

        {/* Liste des catégories */}
        <div className="space-y-0">
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="w-full flex items-center py-4 hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {/* Icône de catégorie */}
                <div className="w-10 h-10 mr-3 flex-shrink-0">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Contenu texte */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </button>

              {/* Séparateur HR - pas pour le dernier élément */}
              {index < categories.length - 1 && (
                <hr className="border-gray-300 border-t-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <SearchPageContent />
    </React.Suspense>
  );
}
