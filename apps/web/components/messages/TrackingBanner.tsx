'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tracking, TrackingStatusEnum, TrackingsService } from '@/services/trackings.service';
import { ApiError } from '@/lib/api';

interface TrackingBannerProps {
  advertId: string;
  isOwner: boolean;
  refreshKey?: number;
}

export const TrackingBanner: React.FC<TrackingBannerProps> = ({
  advertId,
  isOwner,
  refreshKey,
}) => {
  const { user } = useAuth();

  const [tracking, setTracking] = React.useState<Tracking | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [trackingExistsFallback, setTrackingExistsFallback] = React.useState(false);

  const fetchTrackings = React.useCallback(async () => {
    if (!advertId) return;
    try {
      setLoading(true);
      const res = await TrackingsService.getByAnnonceId(advertId);
      const trackings: Tracking[] = res.data || [];

      const found = !isOwner
        ? trackings.find((t: Tracking) => t.accepter?.id === user?.id)
        : trackings[0];

      if (found) {
        setTracking(found);
        setTrackingExistsFallback(false);
      }
    } catch (err) {
      console.warn('[TrackingBanner] Fetch error:', (err as Error).message);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [advertId, isOwner, user?.id]);

  React.useEffect(() => {
    if (user && advertId) {
      console.log('[TrackingBanner] Fetching trackings for advertId:', advertId);
      fetchTrackings();
    }
  }, [user, advertId, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async () => {
    if (!advertId) {
      console.warn('[TrackingBanner] Cannot create tracking: advertId is empty');
      return;
    }
    try {
      setLoading(true);
      console.log('[TrackingBanner] Creating tracking for advertId:', advertId);
      const newTracking = await TrackingsService.create(advertId);
      setTracking(newTracking);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      const msg = apiErr?.message || '';
      console.warn('[TrackingBanner] Create error:', msg, 'status:', apiErr?.status);

      if (
        msg.toLowerCase().includes('already exists') ||
        msg.toLowerCase().includes('tracking already') ||
        msg.toLowerCase().includes('must be a uuid')
      ) {
        // Tracking already exists or validation issue — show fallback
        await fetchTrackings();
        setTrackingExistsFallback(true);
      } else {
        console.warn('[TrackingBanner] Create failed:', msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: () => Promise<Tracking>) => {
    try {
      setLoading(true);
      const updated = await action();
      if (updated) setTracking(updated);
    } catch (err) {
      console.warn('[TrackingBanner] Action failed:', (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !initialized) return null;

  // --- FALLBACK: We know tracking exists but couldn't fetch details ---
  if (!tracking && trackingExistsFallback) {
    return (
      <div className="w-full my-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">⏳</span>
              <h3 className="font-bold text-sm text-blue-800">Demande envoyée</h3>
            </div>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Votre demande de participation a été envoyée. En attente de la réponse du propriétaire.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- No tracking yet: nothing to show (button is now in the annonce bar) ---
  if (!isOwner && !tracking) {
    return null;
  }

  if (!tracking) return null;

  // --- Derive state from tracking fields ---
  const isInProgress = tracking.status === TrackingStatusEnum.IN_PROGRESS;
  const isCompleted = tracking.status === TrackingStatusEnum.COMPLETED;
  const isCancelled = tracking.status === TrackingStatusEnum.CANCELLED;
  const isDispute = tracking.status === TrackingStatusEnum.DISPUTE;

  const bothAccepted = !!tracking.creator_accepted_at && !!tracking.accepter_accepted_at;
  const creatorCompleted = !!tracking.creator_completed_at;

  let title = '';
  let subtitle = '';
  let bgColor = 'bg-gray-50';
  let borderColor = 'border-gray-200';
  let titleColor = 'text-gray-800';
  let icon = '📋';

  if (isCancelled) {
    title = 'Candidature annulée';
    subtitle = 'Cette demande a été annulée.';
    titleColor = 'text-gray-500';
    icon = '✕';
  } else if (isDispute) {
    title = 'Litige en cours';
    subtitle = "Un délai a été dépassé. L'équipe Flemme va examiner la situation.";
    bgColor = 'bg-orange-50';
    borderColor = 'border-orange-200';
    titleColor = 'text-orange-700';
    icon = '⚠️';
  } else if (isCompleted) {
    title = 'Tâche terminée ✅';
    subtitle = 'La tâche a été complétée et confirmée par les deux parties.';
    bgColor = 'bg-green-50';
    borderColor = 'border-green-200';
    titleColor = 'text-green-700';
    icon = '✓';
  } else if (isInProgress && !bothAccepted) {
    if (!isOwner) {
      title = 'Demande envoyée';
      subtitle = 'Votre demande de participation a été envoyée. En attente de la réponse du propriétaire.';
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-200';
      titleColor = 'text-blue-800';
      icon = '⏳';
    } else {
      title = 'Nouvelle candidature';
      subtitle = `${tracking.accepter?.firstname || 'Un utilisateur'} souhaite participer à cette tâche.`;
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-200';
      titleColor = 'text-blue-800';
      icon = '👋';
    }
  } else if (isInProgress && bothAccepted && !creatorCompleted) {
    title = 'Tâche en cours';
    subtitle = 'La candidature a été acceptée. La tâche est en cours de réalisation.';
    bgColor = 'bg-green-50';
    borderColor = 'border-green-200';
    titleColor = 'text-green-700';
    icon = '🔨';
  } else if (isInProgress && creatorCompleted) {
    if (!isOwner) {
      title = 'Tâche marquée comme terminée';
      subtitle = 'Le propriétaire a indiqué que la tâche est terminée. Confirmez pour clôturer.';
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-200';
      titleColor = 'text-blue-800';
      icon = '📝';
    } else {
      title = 'En attente de confirmation';
      subtitle = 'Vous avez marqué la tâche comme terminée. En attente de la confirmation du participant.';
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-200';
      titleColor = 'text-blue-800';
      icon = '⏳';
    }
  }

  return (
    <div className="w-full my-4">
      <div className={`${bgColor} border ${borderColor} rounded-xl overflow-hidden`}>
        <div className="px-4 py-3 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <h3 className={`font-bold text-sm ${titleColor}`}>{title}</h3>
          </div>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{subtitle}</p>
        </div>

        <div className="px-4 py-3">
          {!isOwner && isInProgress && !bothAccepted && (
            <button
              onClick={() =>
                handleAction(() =>
                  TrackingsService.cancel(tracking.id, 'Annulation par le postulant')
                )
              }
              disabled={loading}
              className="w-full text-center text-red-600 text-sm font-medium py-2 hover:underline disabled:opacity-50"
            >
              Annuler ma demande
            </button>
          )}

          {!isOwner && isInProgress && creatorCompleted && (
            <button
              onClick={() => handleAction(() => TrackingsService.confirm(tracking.id))}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'En cours...' : 'Tout est bon, je confirme'}
            </button>
          )}

          {isOwner && isInProgress && !bothAccepted && (
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleAction(() =>
                    TrackingsService.cancel(tracking.id, 'Refusé par le propriétaire')
                  )
                }
                disabled={loading}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition disabled:opacity-50"
              >
                Refuser
              </button>
              <button
                onClick={() => handleAction(() => TrackingsService.accept(tracking.id))}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'En cours...' : 'Accepter'}
              </button>
            </div>
          )}

          {isOwner && isInProgress && bothAccepted && !creatorCompleted && (
            <button
              onClick={() => handleAction(() => TrackingsService.complete(tracking.id))}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'En cours...' : 'Marquer comme terminé'}
            </button>
          )}

          {(isCancelled || isCompleted || isDispute) && (
            <p className="text-center text-xs text-gray-400">Aucune action requise</p>
          )}

          {isOwner && isInProgress && creatorCompleted && (
            <p className="text-center text-xs text-gray-500">Le participant doit confirmer</p>
          )}
        </div>
      </div>
    </div>
  );
};
