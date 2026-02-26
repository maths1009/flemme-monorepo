import { useState, useEffect } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface UseUserLocationResult {
  userLocation: Location | undefined;
  loading: boolean;
  error: string | null;
}

export const useUserLocation = (): UseUserLocationResult => {
  const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  return { userLocation, loading, error };
};
