'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PriceTag } from './PriceTag';

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

interface MapProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
  popupText?: string;
  markers?: Array<{
    lat: number;
    lng: number;
    title?: string;
    price?: number;
    image?: string;
    id?: string;
    popupText?: string;
  }>;
  className?: string;
}

const Map = ({ coordinates, popupText = "Lieu de la mission", markers, className }: MapProps) => {
  const [icon, setIcon] = useState<L.Icon | null>(null);
  const [userIcon, setUserIcon] = useState<L.DivIcon | null>(null);

  useEffect(() => {
    setIcon(createIcon());
    setUserIcon(createUserIcon());
  }, []);

  if (!icon || !userIcon) return null;

  const firstMarker = markers?.[0];
  const centerPosition: [number, number] = coordinates
    ? [coordinates.lat, coordinates.lng]
    : firstMarker
      ? [firstMarker.lat, firstMarker.lng]
      : [48.8566, 2.3522];

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
      {coordinates && (
        <Marker icon={userIcon} position={[coordinates.lat, coordinates.lng]} zIndexOffset={1000}>
          <Popup>{popupText}</Popup>
        </Marker>
      )}
      {markers?.map((marker, index) => (
        <Marker
          key={index}
          icon={icon}
          position={[marker.lat, marker.lng]}
        >
          <Popup className="custom-popup">
            {marker.id ? (
              <Link href={`/adverts/${marker.id}`} className="block w-48">
                <div className="flex flex-col gap-2">
                  <div className="relative w-full h-24 rounded-t-lg overflow-hidden bg-gray-100">
                     <Image
                        src={marker.image || '/images/mock/placeholder.jpg'}
                        alt={marker.title || 'Annonce'}
                        fill
                        className="object-cover"
                      />
                  </div>
                  <div className="p-1">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">{marker.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                         <PriceTag price={marker.price || 0} size="small" />
                         <span className="text-xs text-gray-500">Voir l'annonce</span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <span>{marker.popupText || "Annonce"}</span>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
