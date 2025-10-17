'use client';

import { Button } from '@/components/common';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import * as React from 'react';

// Import dynamique pour éviter les erreurs SSR avec Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

// Configuration des icônes Leaflet pour Next.js
const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationStepProps {
  value: {
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (location: {
    address: string;
    coordinates?: { lat: number; lng: number };
  }) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  value,
  onNext,
  onPrevious,
  onUpdate,
}) => {
  const [address, setAddress] = React.useState(value.address);
  const [coordinates, setCoordinates] = React.useState(
    value.coordinates || { lat: 48.8566, lng: 2.3522 },
  ); // Paris par défaut
  const [isGeocoding, setIsGeocoding] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<
    Array<{ display_name: string; lat: string; lon: string }>
  >([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // Fonction pour récupérer les suggestions d'adresses
  const fetchAddressSuggestions = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=fr`,
      );
      const data = await response.json();
      setSuggestions(data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
      setSuggestions([]);
    }
  };

  // Fonction de géocodage avec Nominatim
  const geocodeAddress = async (addressQuery: string) => {
    if (!addressQuery.trim()) return;

    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}&limit=1&countrycodes=fr`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const newCoordinates = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
        setCoordinates(newCoordinates);
        onUpdate({ address: addressQuery, coordinates: newCoordinates });
      }
    } catch (error) {
      console.error('Erreur de géocodage:', error);
    } finally {
      setIsGeocoding(false);
    }
  };

  // Sélectionner une suggestion
  const selectSuggestion = (suggestion: {
    display_name: string;
    lat: string;
    lon: string;
  }) => {
    setAddress(suggestion.display_name);
    const newCoordinates = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    };
    setCoordinates(newCoordinates);
    onUpdate({ address: suggestion.display_name, coordinates: newCoordinates });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAddress(newValue);
    onUpdate({ ...value, address: newValue });
  };

  // Récupérer les suggestions avec un délai
  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchAddressSuggestions(address);
    }, 300);

    return () => clearTimeout(timer);
  }, [address]);

  // Géocoder l'adresse sélectionnée avec un délai plus long
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (address.trim().length > 3 && !showSuggestions) {
        geocodeAddress(address);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [address, showSuggestions]);

  const handleContinue = () => {
    if (address.trim()) {
      onNext();
    }
  };

  const isValid = address.trim().length > 0;

  return (
    <div className="flex h-full flex-col px-6 py-8">
      {/* Titre de l'étape */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Où aura lieu votre tâche ?
        </h2>
        <p className="text-foreground/60 text-base">Adresse*</p>
      </div>

      {/* Carte interactive */}
      <div className="mb-6">
        <div className="w-full h-48 rounded-2xl overflow-hidden relative">
          {typeof window !== 'undefined' && (
            <MapContainer
              center={[coordinates.lat, coordinates.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              key={`${coordinates.lat}-${coordinates.lng}`}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {address && (
                <Marker
                  position={[coordinates.lat, coordinates.lng]}
                  icon={customIcon}
                >
                  <Popup>{address || 'Localisation sélectionnée'}</Popup>
                </Marker>
              )}
            </MapContainer>
          )}

          {/* Indicateur de chargement */}
          {isGeocoding && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-2xl">
              <div className="text-sm text-gray-600">
                Recherche de l'adresse...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Champ d'adresse */}
      <div className="flex-1 flex flex-col">
        <div className="mb-8 relative">
          <div
            className="flex items-center border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            style={{ borderRadius: '24px' }}
          >
            <div className="px-4 text-gray-600 text-base">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <input
              type="text"
              value={address}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Saisissez votre adresse..."
              className="flex-1 px-4 py-3 text-base bg-transparent border-none outline-none placeholder-gray-400"
              autoFocus
            />
          </div>

          {/* Suggestions d'adresses */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="text-sm text-gray-800 font-medium">
                    {suggestion.display_name.split(',')[0]}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {suggestion.display_name
                      .split(',')
                      .slice(1)
                      .join(',')
                      .trim()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bouton continuer - fixé en bas */}
        <div className="mt-auto">
          <Button
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full"
            variant="secondary"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};
