import { useState, useEffect, useCallback } from 'react';
import { LikesService, Like } from '@/services/likes.service';
import { useAuth } from '@/context/AuthContext';

export function useLikes() {
  const { user } = useAuth();
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLikes = useCallback(async () => {
    if (!user) {
      setLikes([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await LikesService.getUserLikes(user.id);
      setLikes(response.data);
    } catch (error) {
      console.error('Failed to fetch likes', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const checkIsLiked = (annonceId: string) => {
    
    const like = likes.find((l) => l.annonce?.id === annonceId);
    return {
      isLiked: !!like,
      likeId: like?.id,
    };
  };

  const toggleLike = async (annonceId: string) => {
    const { isLiked, likeId } = checkIsLiked(annonceId);
    
    try {
      if (isLiked && likeId) {
        await LikesService.delete(likeId);
      } else {
        await LikesService.create(annonceId);
      }
      
      await fetchLikes();
    } catch (error) {
      console.error('Failed to toggle like', error);
      
      if ((error as any)?.status === 400) {
           await fetchLikes();
      }
    }
  };

  return {
    likes,
    loading,
    checkIsLiked,
    toggleLike,
    refreshLikes: fetchLikes
  };
}
