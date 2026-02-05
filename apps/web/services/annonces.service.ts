import { fetchClient } from '@/lib/api';

export interface Annonce {
  id: string;
  title: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    profile_picture_url?: string;
  };
  photos?: {
    id: string;
    url: string;
  }[];
}

export const AnnoncesService = {
  async create(data: any) {
    return fetchClient<Annonce>('/annonces', {
      body: JSON.stringify(data),
      method: 'POST',
    });
  },
  async getAll(params?: { latitude?: number; longitude?: number; distance?: number; limit?: number; page?: number; userId?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return fetchClient<{ data: Annonce[]; meta: any }>(`/annonces?${query}`);
  },

  async getOne(id: string) {
    return fetchClient<Annonce>(`/annonces/${id}`);
  },

  async delete(id: string) {
    return fetchClient<void>(`/annonces/${id}`, {
      method: 'DELETE',
    });
  },

  async update(id: string, data: Partial<Annonce>) {
    return fetchClient<Annonce>(`/annonces/${id}`, {
      body: JSON.stringify(data),
      method: 'PATCH',
    });
  },
};
