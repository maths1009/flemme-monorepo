'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import type { Annonce } from '@/services/annonces.service';
import { TaskCard } from './TaskCard';

interface CarouselProps {
  annonces: Annonce[];
}

export const Carousel: React.FC<CarouselProps> = ({ annonces }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Reset index if annonces change or empty
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [annonces]);

  if (!annonces || annonces.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? annonces.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === annonces.length - 1 ? 0 : prevIndex + 1));
  };

  const currentItem = annonces[currentIndex];

  if (!currentItem) {
    return null;
  }

  const handleTaskClick = () => {
    router.push(`/adverts/${currentItem.id}`);
  };

  return (
    <div className="px-6 mb-8">
      {/* Card d'annonce */}
      <div className="mb-6">
        <TaskCard
          avatar={currentItem.user.profile_picture_url || 'https://placehold.co/100'}
          date={`le ${new Date(currentItem.created_at).toLocaleDateString()}`} // Placeholder
          image={'https://placehold.co/600x400'}
          onClick={handleTaskClick}
          price={currentItem.price}
          title={currentItem.title}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between bg-foreground rounded-full px-1 py-2">
        {/* Bouton précédent */}
        <button
          className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
          onClick={goToPrevious}
        >
          <ChevronLeft className="w-6 h-6 text-white border-2 border-white rounded-full" />
        </button>

        {/* Bouton "Faire la tâche" */}
        <button
          className="flex-1 mx-4 py-3 bg-foreground text-white rounded-full font-medium hover:bg-gray-700 transition-colors border-2 border-white"
          onClick={handleTaskClick}
        >
          Faire la tâche
        </button>

        {/* Bouton suivant */}
        <button
          className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
          onClick={goToNext}
        >
          <ChevronRight className="w-6 h-6 text-white border-2 border-white rounded-full" />
        </button>
      </div>

      {/* Indicateurs de slides */}
      <div className="flex justify-center mt-4 space-x-2">
        {annonces.map((_, index) => (
          <button
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            key={index}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
