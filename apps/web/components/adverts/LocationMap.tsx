'use client';

import type * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuration des icônes Leaflet
const customIcon = new L.Icon({
  iconAnchor: [12, 41],
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LocationMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

const LocationMap: React.FC<LocationMapProps> = ({ coordinates }) => {
  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      key={`${coordinates.lat}-${coordinates.lng}`}
      style={{ height: '100%', width: '100%' }}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={customIcon} position={[coordinates.lat, coordinates.lng]}>
        <Popup>Lieu de la mission</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
