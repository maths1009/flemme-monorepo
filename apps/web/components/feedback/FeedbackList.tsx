'use client';

import { FeedbackCard } from './FeedbackCard';
import * as React from 'react';

interface FeedbackAuthor {
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
  sender: FeedbackAuthor;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
  loading?: boolean;
  onAuthorClick?: (authorId: string) => void;
}

export const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  loading = false,
  onAuthorClick,
}) => {
  return (
    <div className="px-4">
      <h2 className="text-xl font-semibold text-gray-400 mb-4">Toutes les évaluations</h2>
      <div className="border-t border-gray-100"></div>

      {loading ? (
        <p className="text-sm text-gray-400 py-4">Chargement des avis...</p>
      ) : feedbacks.length > 0 ? (
        <div>
          {feedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              author={feedback.sender}
              rating={feedback.rating}
              comment={feedback.message}
              createdAt={feedback.created_at}
              onAuthorClick={onAuthorClick}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 py-4">Aucun avis pour le moment.</p>
      )}
    </div>
  );
};
