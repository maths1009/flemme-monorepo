'use client';

import { FeedbackList } from '@/components/feedback';
import { useAuth } from '@/context/AuthContext';
import { fetchClient } from '@/lib/api';
import { ArrowLeft, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface FeedbackSender {
  id: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  profile_picture_url?: string;
}

interface Feedback {
  id: string;
  rating: number;
  message: string;
  created_at: string;
  sender: FeedbackSender;
}

interface FeedbackResponse {
  data: Feedback[];
  meta: any;
}

export default function FeedbackPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          const response = await fetchClient<FeedbackResponse>(`/feedbacks?receiver_id=${user.id}`);
          setFeedbacks(response.data);
        } catch (error) {
          console.error('Error fetching feedbacks:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFeedbacks();
  }, [user?.id]);

  const averageRating = feedbacks.length > 0
    ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
    : 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="flex items-center px-4 py-4 relative justify-center">
        <button onClick={() => router.back()} className="absolute left-4 p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
        </button>
        <h1 className="text-xl font-bold text-[#1A1A1A]">
          {user.username || `${user.firstname} ${user.lastname}`}
        </h1>
      </div>
      <div className="border-t border-gray-100"></div>

      <div className="flex flex-col items-center py-8">
        <span className="text-4xl font-bold text-[#1A1A1A]">{averageRating.toFixed(1)}</span>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
            />
          ))}
        </div>
        <span className="text-gray-400 text-sm mt-1">({feedbacks.length})</span>
      </div>

      <FeedbackList
        feedbacks={feedbacks}
        loading={loading}
        onAuthorClick={(authorId) => console.log('Navigate to profile:', authorId)}
      />
    </div>
  );
}
