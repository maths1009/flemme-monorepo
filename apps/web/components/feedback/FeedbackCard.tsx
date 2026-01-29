'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

interface FeedbackAuthor {
  id: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  profile_picture_url?: string;
}

interface FeedbackCardProps {
  author: FeedbackAuthor;
  rating: number;
  comment: string;
  createdAt: string;
  onAuthorClick?: (authorId: string) => void;
}

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 14) return "Il y a 1 semaine";
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
  if (diffDays < 60) return "Il y a 1 mois";
  return `Il y a ${Math.floor(diffDays / 30)} mois`;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  author,
  rating,
  comment,
  createdAt,
  onAuthorClick,
}) => {
  const displayName = author.username || `${author.firstname || ''} ${author.lastname || ''}`.trim() || 'Utilisateur';

  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100">
      <button
        onClick={() => onAuthorClick?.(author.id)}
        className="flex-shrink-0"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {author.profile_picture_url ? (
            <Image
              src={author.profile_picture_url}
              alt={displayName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-gray-500">
              {displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-[#1A1A1A] text-sm">{displayName}</h4>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
            </div>
          </div>
          <span className="text-xs text-[#1A1A1A]">{formatRelativeDate(createdAt)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{comment}</p>
      </div>
    </div>
  );
};
