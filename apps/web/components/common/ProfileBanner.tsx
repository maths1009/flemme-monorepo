'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchClient } from '@/lib/api';

interface ProfileBannerProps {
  user: {
    id: string;
    name: string;
    rating: number; // Fallback or initial
    reviews: number; // Fallback or initial
    avatar: string;
  };
  onMessageClick?: () => void;
}

interface Feedback {
  rating: number;
}

interface FeedbackResponse {
  data: Feedback[];
  meta: {
    total: number;
  };
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  user,
  onMessageClick,
}) => {
  const [rating, setRating] = useState(user.rating);
  const [reviewsCount, setReviewsCount] = useState(user.reviews);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user.id) return;
      try {
        // Fetch feedbacks to calculate stats
        // We fetch paginated results but we rely on meta.total for count
        // For average, we ideally need all ratings. Limit=100 is a reasonable approximation for now
        // consistent with "frontend-only" request without heavy load. 
        // If exact global average is needed for >100 reviews, backend support would be better.
        const response = await fetchClient<FeedbackResponse>(`/feedbacks?receiver_id=${user.id}&limit=100`);
        
        if (response.data) {
          const total = response.meta?.total ?? response.data.length;
          setReviewsCount(total);

          if (response.data.length > 0) {
            const sum = response.data.reduce((acc, curr) => acc + curr.rating, 0);
            const average = sum / response.data.length;
            setRating(average);
          } else {
             setRating(0);
          }
        }
      } catch (error) {
        console.error('Error fetching feedback stats:', error);
      }
    };

    fetchStats();
  }, [user.id]);

  return (
    <div className="flex items-center justify-between mb-6 py-4">
      <Link href={`/profile/${user.id}`} className="flex items-center space-x-3 group hover:opacity-80 transition-opacity">
        {user.avatar && user.avatar.trim() !== '' ? (
          <Image
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-semibold text-gray-500">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-800 group-hover:underline">{user.name}</h3>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({reviewsCount})</span>
          </div>
        </div>
      </Link>
      <button
        onClick={onMessageClick}
        className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium"
      >
        Message
      </button>
    </div>
  );
};
