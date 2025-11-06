'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { TaskCard } from './TaskCard';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  avatar: string;
  date: string;
  price: number;
}

const mockData: CarouselItem[] = [
  {
    id: 1,
    title: 'Nettoyer ma voiture',
    image: '/images/carousel/car.jpg',
    avatar: '/images/carousel/avatar1.jpg',
    date: 'le 15/04/2025',
    price: 20,
  },
  {
    id: 2,
    title: 'Acheter du beurre',
    image: '/images/carousel/shopping.jpg',
    avatar: '/images/carousel/avatar2.jpg',
    date: 'le 14/04/2025',
    price: 5,
  },
  {
    id: 3,
    title: 'Promener mon chien Croquette',
    image: '/images/carousel/dog.jpg',
    avatar: '/images/carousel/avatar3.jpg',
    date: 'le 16/04/2025',
    price: 12,
  },
  {
    id: 4,
    title: 'Déjeuner ensemble',
    image: '/images/carousel/food.jpg',
    avatar: '/images/carousel/avatar4.jpg',
    date: 'le 17/04/2025',
    price: 25,
  },
  {
    id: 5,
    title: 'Réparer ma bicyclette',
    image: '/images/carousel/bike.jpg',
    avatar: '/images/carousel/avatar5.jpg',
    date: 'le 18/04/2025',
    price: 15,
  },
];

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(2); // Commence sur la 3ème (index 2)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mockData.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mockData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentItem = mockData[currentIndex];

  const handleTaskClick = () => {
    // Navigation vers la page de détail de la tâche
    console.log('Clic sur la tâche:', currentItem.title);
  };

  return (
    <div className="px-6 mb-8">
      {/* Card d'annonce */}
      <div className="mb-6">
        <TaskCard
          title={currentItem.title}
          image={currentItem.image}
          avatar={currentItem.avatar}
          date={currentItem.date}
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
        {mockData.map((_, index) => (
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
