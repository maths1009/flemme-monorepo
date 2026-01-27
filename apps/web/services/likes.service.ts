import { fetchClient } from '@/lib/api';
import { Annonce } from './annonces.service';

export interface Like {
  id: string;
  created_at: string;
  annonce: Annonce | { id: string }; // Handle potential partial data
}

export const LikesService = {
  async getUserLikes(userId: string) {
    return fetchClient<{ data: Like[]; meta: any }>(`/likes?user_id=${userId}&limit=100`);
  },

  async create(annonceId: string) {
    return fetchClient<Like>('/likes', {
      method: 'POST',
      body: JSON.stringify({ annonce_id: annonceId }),
    });
  },

  async delete(likeId: string) {
    return fetchClient<void>(`/likes/${likeId}`, {
      method: 'DELETE',
    });
  },
};
