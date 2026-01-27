'use client';

import { ArrowLeft, Edit, Heart, MoreVertical, Share2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useRef, useState } from 'react';

interface ImageCarouselSectionProps {
  images: string[];
  title: string;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}

export const ImageCarouselSection: React.FC<ImageCarouselSectionProps> = ({
  images,
  title,
  isLiked = false,
  onLikeToggle,
  isOwner = false,
  onEdit,
  onDelete,
  onShare,
}) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <button 
            onClick={onLikeToggle}
            className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center transition-transform active:scale-95"
          >
            <Heart 
              className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </button>

          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center transition-transform active:scale-95"
            >
              <MoreVertical className="w-5 h-5 text-white" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 overflow-hidden text-gray-800 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                {isOwner ? (
                  <>
                    <button
                      onClick={() => { setShowMenu(false); onEdit?.(); }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-sm font-medium text-gray-700"
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                      Modifier
                    </button>
                    <button
                      onClick={() => { setShowMenu(false); onShare?.(); }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-sm font-medium text-gray-700"
                    >
                       <Share2 className="w-4 h-4 text-gray-500" />
                       Partager
                    </button>
                    <div className="h-px bg-gray-100 my-1 mx-2" />
                    <button
                      onClick={() => { setShowMenu(false); onDelete?.(); }}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setShowMenu(false); onShare?.(); }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-sm font-medium text-gray-700"
                  >
                     <Share2 className="w-4 h-4 text-gray-500" />
                     Partager
                  </button>
                )}
              </div>
            )}
          </div>
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
