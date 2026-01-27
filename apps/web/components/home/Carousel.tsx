'use client';

import { getAllAdverts } from '@/lib/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { TaskCard } from './TaskCard';

export const Carousel: React.FC = () => {
  const router = useRouter();
  const adverts = getAllAdverts();
  const [currentIndex, setCurrentIndex] = React.useState(2); // Commence sur la 3ème (index 2)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? adverts.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === adverts.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentItem = adverts[currentIndex];

  const handleTaskClick = () => {
    // Navigation vers la page de détail de la tâche
    router.push(`/adverts/${currentItem.id}`);
  };

  return (
    <div className="px-6 mb-8">
      {/* Card d'annonce */}
      <div className="mb-6">
        <TaskCard
          title={currentItem.title}
          image={currentItem.image}
          avatar={currentItem.user.avatar}
          date={`le ${currentItem.date}`}
          price={currentItem.price}
          onClick={handleTaskClick}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between bg-foreground rounded-full px-1 py-2">
        {/* Bouton précédent */}
        <button
          onClick={goToPrevious}
          className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white border-2 border-white rounded-full" />
        </button>

        {/* Bouton "Faire la tâche" */}
        <button className="flex-1 mx-4 py-3 bg-foreground text-white rounded-full font-medium hover:bg-gray-700 transition-colors border-2 border-white">
          Faire la tâche
        </button>

        {/* Bouton suivant */}
        <button
          onClick={goToNext}
          className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white border-2 border-white rounded-full" />
        </button>
      </div>

      {/* Indicateurs de slides */}
      <div className="flex justify-center mt-4 space-x-2">
        {adverts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
