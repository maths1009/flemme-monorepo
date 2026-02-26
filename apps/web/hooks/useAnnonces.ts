import { useEffect, useState } from 'react';
import { type Annonce, AnnoncesService } from '@/services/annonces.service';

export function useAnnonces(params?: { latitude?: number; longitude?: number; distance?: number }) {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        setLoading(true);
        const response = await AnnoncesService.getAll(params);
        setAnnonces(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
  }, [JSON.stringify(params)]);

  return { annonces, error, loading };
}

export function useAnnonce(id: string) {
  const [annonce, setAnnonce] = useState<Annonce | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAdvert = async () => {
      try {
        setLoading(true);
        const data = await AnnoncesService.getOne(id);
        setAnnonce(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvert();
  }, [id]);

  return { annonce, error, loading };
}
