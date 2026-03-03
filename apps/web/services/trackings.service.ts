import { fetchClient } from '@/lib/api';
import { Annonce } from './annonces.service';

export enum TrackingStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DISPUTE = 'DISPUTE',
}

export interface Tracking {
  id: string;
  annonce: Annonce;
  creator: {
    id: string;
    firstname: string;
    lastname: string;
    profile_picture_url?: string;
  };
  accepter: {
    id: string;
    firstname: string;
    lastname: string;
    profile_picture_url?: string;
  };
  negotiated_price: number;
  status: TrackingStatusEnum;
  creator_accepted_at?: string | null;
  accepter_accepted_at?: string | null;
  creator_completed_at?: string | null;
  accepter_confirmed_at?: string | null;
  cancelled_at?: string | null;
  cancelled_by?: string | null;
  acceptance_deadline: string;
  completion_deadline?: string | null;
  confirmation_deadline?: string | null;
  created_at: string;
  updated_at: string;
}

export const TrackingsService = {
  async create(annonceId: string) {
    return fetchClient<Tracking>('/trackings', {
      body: JSON.stringify({ annonce_id: annonceId }),
      method: 'POST',
    });
  },

  async getOne(id: string) {
    return fetchClient<Tracking>(`/trackings/${id}`);
  },

  async getByAnnonceId(annonceId: string) {
    return fetchClient<{ data: Tracking[]; meta: any }>(`/trackings?annonce_id=${annonceId}`);
  },

  async accept(id: string) {
    return fetchClient<Tracking>(`/trackings/${id}/accept`, {
      method: 'PATCH',
    });
  },

  async complete(id: string) {
    return fetchClient<Tracking>(`/trackings/${id}/complete`, {
      method: 'PATCH',
    });
  },

  async confirm(id: string) {
    return fetchClient<Tracking>(`/trackings/${id}/confirm`, {
      method: 'PATCH',
    });
  },

  async cancel(id: string, reason?: string) {
    return fetchClient<Tracking>(`/trackings/${id}/cancel`, {
      body: JSON.stringify({ reason }),
      method: 'PATCH',
    });
  },
};
