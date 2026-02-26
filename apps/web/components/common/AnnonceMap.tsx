'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useUserLocation } from '@/hooks/useUserLocation';

const createIcon = () => {
  return new L.Icon({
    iconAnchor: [12, 41],
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
};

const createUserIcon = () => {
  return L.divIcon({
    className: 'custom-user-location',
    html: `
      <div class="relative flex items-center justify-center w-6 h-6 -ml-3 -mt-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white shadow-sm"></span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [0, 0],
  });
};

interface AnnonceMapProps {
  advertLocation: {
    lat: number;
    lng: number;
  };
  className?: string;
}

const AnnonceMap = ({ advertLocation, className }: AnnonceMapProps) => {
  const [icon, setIcon] = useState<L.Icon | null>(null);
  const [userIcon, setUserIcon] = useState<L.DivIcon | null>(null);
  const { userLocation } = useUserLocation();

  useEffect(() => {
    setIcon(createIcon());
    setUserIcon(createUserIcon());
  }, []);

  if (!icon || !userIcon) return null;

  const centerPosition: [number, number] = [advertLocation.lat, advertLocation.lng];

  return (
    <MapContainer
      center={centerPosition}
      key={`${centerPosition[0]}-${centerPosition[1]}`}
      style={{ height: '100%', width: '100%' }}
      zoom={13}
      className={className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker icon={icon} position={centerPosition}>
        <Popup>Lieu de la mission</Popup>
      </Marker>

      {userLocation && (
        <Marker icon={userIcon} position={[userLocation.lat, userLocation.lng]} zIndexOffset={1000}>
          <Popup>Ma position</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default AnnonceMap;
