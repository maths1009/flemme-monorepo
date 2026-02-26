'use client';

import { Button } from '@/components/common';
import { LocationAutocomplete } from '@/components/common/LocationAutocomplete';
import dynamic from 'next/dynamic';
import * as React from 'react';

const Map = dynamic(() => import('@/components/common/Map'), {
  loading: () => (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
      Chargement de la carte...
    </div>
  ),
  ssr: false,
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
  );
  const [isGeocoding, setIsGeocoding] = React.useState(false);

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

  const handleAddressSelect = (location: {
    address: string;
    lat: number;
    lng: number;
  }) => {
    setAddress(location.address);
    setCoordinates({ lat: location.lat, lng: location.lng });
    onUpdate({
      address: location.address,
      coordinates: { lat: location.lat, lng: location.lng },
    });
  };

  const handleAddressChange = (newValue: string) => {
    setAddress(newValue);
    onUpdate({ ...value, address: newValue });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (address.trim().length > 3) {
         
        geocodeAddress(address);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [address]);

  const handleContinue = () => {
    if (address.trim()) {
      onNext();
    }
  };

  const isValid = address.trim().length > 0;

  return (
    <div className="flex h-full flex-col px-6 py-8">
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Où aura lieu votre tâche ?
        </h2>
        <p className="text-foreground/60 text-base">Adresse*</p>
      </div>

      <div className="mb-6">
        <div className="w-full h-48 rounded-2xl overflow-hidden relative border border-gray-100 shadow-sm">
          <Map coordinates={coordinates} popupText={address || "Localisation sélectionnée"} />

          {isGeocoding && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-[1000]">
              <div className="text-sm text-gray-600 font-medium">
                Mise à jour de la carte...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-8 text-black">
          <LocationAutocomplete
            value={address}
            onChange={handleAddressChange}
            onSelect={handleAddressSelect}
            className="w-full"
          />
        </div>

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
