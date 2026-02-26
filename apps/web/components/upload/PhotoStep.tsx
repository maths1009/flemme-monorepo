'use client';

import { Button } from '@/components/common';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

interface PhotoStepProps {
  value: File[];
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (photos: File[]) => void;
}

export const PhotoStep: React.FC<PhotoStepProps> = ({
  value,
  onNext,
  onPrevious,
  onUpdate,
}) => {
  const [photos, setPhotos] = React.useState<File[]>(value);
  const [needsPhotos, setNeedsPhotos] = React.useState<boolean | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = [...photos, ...files].slice(0, 4);
    setPhotos(newPhotos);
    onUpdate(newPhotos);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onUpdate(newPhotos);
  };

  const handleNeedsPhotosChange = (needs: boolean) => {
    setNeedsPhotos(needs);
    if (!needs) {
      setPhotos([]);
      onUpdate([]);
    }
  };

  const handleContinue = () => {
    if (needsPhotos !== null) {
      onNext();
    }
  };

  const isValid = needsPhotos !== null;

  const renderPhotoSlot = (index: number) => {
    const photo = photos[index];

    if (photo) {
      return (
        <div className="relative w-full h-full bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={URL.createObjectURL(photo)}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => handleRemovePhoto(index)}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={needsPhotos === false}
        className={`w-full h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
          needsPhotos === false
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
        }`}
      >
        {index === 0 ? (
          <>
            <Image
              src="/images/upload/photo.svg"
              alt="Photo"
              width={32}
              height={32}
              className="w-8 h-8 mb-2"
            />
            <span className="text-sm text-gray-500">Ajouter des photos</span>
          </>
        ) : (
          <Plus className="w-6 h-6 text-gray-400" />
        )}
      </button>
    );
  };

  return (
    <div className="flex h-full flex-col px-6 py-8">
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Photos</h2>
        <p className="text-foreground/60 text-base">Faut-il des photos ?</p>
      </div>

      <div className="mb-8">
        <div className="flex space-x-3">
          <button
            onClick={() => handleNeedsPhotosChange(true)}
            className={`px-6 py-2 text-sm font-medium transition-all ${
              needsPhotos === true
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={
              needsPhotos === true
                ? { backgroundColor: '#4E77CF', borderRadius: '6px' }
                : { borderRadius: '6px' }
            }
          >
            Oui
          </button>
          <button
            onClick={() => handleNeedsPhotosChange(false)}
            className={`px-6 py-2 text-sm font-medium transition-all ${
              needsPhotos === false
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={
              needsPhotos === false
                ? { backgroundColor: '#4E77CF', borderRadius: '6px' }
                : { borderRadius: '6px' }
            }
          >
            Non
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div
          className="grid grid-cols-2 gap-4 mb-8"
          style={{ height: '240px' }}
        >
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="aspect-square">
              {renderPhotoSlot(index)}
            </div>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
        />

        <div className="mt-auto">
          <Button
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full"
            variant="secondary"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};
