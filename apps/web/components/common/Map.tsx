'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Configuration des icônes Leaflet
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

interface MapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  popupText?: string;
  className?: string;
}

const Map = ({ coordinates, popupText = "Lieu de la mission", className }: MapProps) => {
  const [icon, setIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    setIcon(createIcon());
  }, []);

  if (!icon) return null;

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      key={`${coordinates.lat}-${coordinates.lng}`}
      style={{ height: '100%', width: '100%' }}
      zoom={13}
      className={className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={icon} position={[coordinates.lat, coordinates.lng]}>
        <Popup>{popupText}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
