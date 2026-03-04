import { useState } from 'react';
import { Tracking, TrackingsService } from '@/services/trackings.service';

export function useTrackings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createTracking = async (annonceId: string): Promise<Tracking | null> => {
    try {
      setLoading(true);
      setError(null);
      return await TrackingsService.create(annonceId);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTracking = async (id: string): Promise<Tracking | null> => {
    try {
      setLoading(true);
      setError(null);
      return await TrackingsService.getOne(id);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTrackingsByAnnonce = async (annonceId: string): Promise<Tracking[]> => {
    try {
      setLoading(true);
      setError(null);
      const res = await TrackingsService.getByAnnonceId(annonceId);
      return res.data;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const acceptTracking = async (id: string): Promise<Tracking | null> => {
    try {
      setLoading(true);
      setError(null);
      return await TrackingsService.accept(id);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const completeTracking = async (id: string): Promise<Tracking | null> => {
    try {
      setLoading(true);
      setError(null);
      return await TrackingsService.complete(id);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const confirmTracking = async (id: string): Promise<Tracking | null> => {
    try {
      setLoading(true);
      setError(null);
      return await TrackingsService.confirm(id);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelTracking = async (id: string, reason?: string): Promise<Tracking | null> => {
    try {
      setLoading(true);
      setError(null);
      return await TrackingsService.cancel(id, reason);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    acceptTracking,
    cancelTracking,
    completeTracking,
    confirmTracking,
    createTracking,
    error,
    getTracking,
    getTrackingsByAnnonce,
    loading,
  };
}
