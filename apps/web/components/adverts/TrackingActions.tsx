import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTrackings } from '@/hooks/useTrackings';
import { Tracking, TrackingStatusEnum } from '@/services/trackings.service';

interface TrackingActionsProps {
  advertId: string;
  isOwner: boolean;
}

export function TrackingActions({ advertId, isOwner }: TrackingActionsProps) {
  const { user } = useAuth();
  const {
    acceptTracking,
    cancelTracking,
    completeTracking,
    confirmTracking,
    createTracking,
    error,
    getTrackingsByAnnonce,
    loading,
  } = useTrackings();

  const [trackings, setTrackings] = useState<Tracking[]>([]);

  const fetchTrackings = async () => {
    const data = await getTrackingsByAnnonce(advertId);
    setTrackings(data || []);
  };

  useEffect(() => {
    if (user) {
      fetchTrackings();
    }
  }, [advertId, user]);

  const handleCreate = async () => {
    const newTracking = await createTracking(advertId);
    if (newTracking) {
      setTrackings(prev => [...prev, newTracking]);
    }
  };

  const handleAction = async (action: () => Promise<Tracking | null>) => {
    const updated = await action();
    if (updated) {
      setTrackings(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    }
  };

  if (!user) {
    return (
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-500 text-center text-sm">Connectez-vous pour postuler ou gérer les candidatures.</p>
      </div>
    );
  }

  // Determine user's specific tracking if not owner
  const myTracking = !isOwner ? trackings.find(t => t.accepter?.id === user.id) : null;

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Suivi et Candidatures</h2>
      {error && <p className="text-red-500 mb-4">{error.message}</p>}

      {!isOwner ? (
        // Worker View
        <div>
          {!myTracking ? (
            <button
              className="w-full bg-gray-800 outline-none text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={handleCreate}
            >
              {loading ? 'En cours...' : 'Postuler à cette tâche'}
            </button>
          ) : (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
              <p className="font-semibold text-blue-800 mb-1">
                Statut de la candidature: <span>{myTracking.status}</span>
              </p>
              
              <div className="mt-4 flex flex-col gap-2">
                {myTracking.status === TrackingStatusEnum.IN_PROGRESS && !myTracking.creator_accepted_at && (
                  <button
                    className="w-full bg-red-100 outline-none text-red-700 px-4 py-2 rounded-xl font-medium hover:bg-red-200 transition"
                    onClick={() => handleAction(() => cancelTracking(myTracking.id, 'Annulation par le postulant'))}
                  >
                    Annuler ma candidature
                  </button>
                )}

                {myTracking.status === TrackingStatusEnum.IN_PROGRESS && myTracking.creator_completed_at && (
                  <button
                    className="w-full bg-green-600 outline-none text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition"
                    onClick={() => handleAction(() => confirmTracking(myTracking.id))}
                  >
                    Confirmer la fin de la tâche
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Owner View
        <div className="space-y-4">
          {trackings.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune candidature pour le moment.</p>
          ) : (
            trackings.map(tracking => (
              <div key={tracking.id} className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-medium text-gray-800">
                    Candidat: {tracking.creator?.firstname} {tracking.creator?.lastname}
                  </div>
                  <div className="text-xs font-semibold px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                    {tracking.status}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tracking.status === TrackingStatusEnum.IN_PROGRESS && !tracking.creator_accepted_at && (
                    <button
                      className="bg-blue-600 outline-none text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                      onClick={() => handleAction(() => acceptTracking(tracking.id))}
                    >
                      Accepter
                    </button>
                  )}

                  {tracking.status === TrackingStatusEnum.IN_PROGRESS && !!tracking.creator_accepted_at && !!tracking.accepter_accepted_at && (
                    <button
                      className="bg-green-600 outline-none text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                      onClick={() => handleAction(() => completeTracking(tracking.id))}
                    >
                      Marquer comme terminé
                    </button>
                  )}

                  {tracking.status === TrackingStatusEnum.IN_PROGRESS && (
                    <button
                      className="bg-red-100 outline-none text-red-700 px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition"
                      onClick={() => handleAction(() => cancelTracking(tracking.id, 'Annulation par le propriétaire'))}
                    >
                      Annuler / Refuser
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
