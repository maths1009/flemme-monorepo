'use client';

import { ArrowLeft, Heart, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useRef, useState } from 'react';

interface ImageCarouselSectionProps {
  images: string[];
  title: string;
}

export const ImageCarouselSection: React.FC<ImageCarouselSectionProps> = ({
  images,
  title,
}) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (scrollContainerRef.current) {
          const scrollLeft = scrollContainerRef.current.scrollLeft;
          const itemWidth = scrollContainerRef.current.clientWidth;
          const index = Math.round(scrollLeft / itemWidth);

          // Force le scroll à aller exactement à l'image
          scrollContainerRef.current.scrollTo({
            left: index * itemWidth,
            behavior: 'smooth',
          });
          setCurrentImageIndex(index);
        }
      }, 50);
    }
  };

  return (
    <div className="relative px-6 pt-6">
      <div className="relative h-64 w-full rounded-2xl overflow-hidden">
        {/* Conteneur scrollable */}
        <div
          ref={scrollContainerRef}
          className="flex h-full w-full overflow-x-auto scroll-smooth scrollbar-hide"
          onScroll={handleScroll}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} - Photo ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Boutons overlay */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-transparent rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </button>

          <button className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Indicateur de photos */}
        <div
          className="absolute bottom-4 right-4 text-white text-sm px-2 py-1"
          style={{
            borderRadius: '39px',
            border: '1px solid rgba(40, 41, 36, 0.50)',
            background: 'rgba(40, 41, 36, 0.50)',
          }}
        >
          {currentImageIndex + 1}/{images.length}
        </div>
      </div>
    </div>
  );
};
