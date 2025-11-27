'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

interface ProfileBannerProps {
  user: {
    name: string;
    rating: number;
    reviews: number;
    avatar: string;
  };
  onMessageClick?: () => void;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  user,
  onMessageClick,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 p-4">
      <div className="flex items-center space-x-3">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={`Avatar de ${user.name}`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-600">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-800">{user.name}</h3>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({user.reviews})</span>
          </div>
        </div>
      </div>
      <button
        onClick={onMessageClick}
        className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium"
      >
        Message
      </button>
    </div>
  );
};
