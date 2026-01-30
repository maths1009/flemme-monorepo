'use client';

import { Camera } from 'lucide-react';
import * as React from 'react';

interface PhotoUploadProps {
  onImageChange?: (file: File | null, preview: string | null) => void;
  onError?: (error: string) => void;
  size?: number;
  className?: string;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
  centered?: boolean;
}

const PhotoUpload = React.forwardRef<HTMLInputElement, PhotoUploadProps>(
  (
    {
      onImageChange,
      onError,
      size = 120,
      className = '',
      maxSizeInMB = 5,
      acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
      centered = true,
    },
    ref,
  ) => {
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        resetUpload();
        return;
      }

      // Vérifier le type de fichier
      if (!acceptedFormats.some((format) => file.type === format)) {
        const formatsText = acceptedFormats
          .map((f) => (f.split('/')[1] ?? f).toUpperCase())
          .join(', ');
        onError?.(`Format non supporté. Formats acceptés : ${formatsText}`);
        resetUpload();
        return;
      }

      // Vérifier la taille
      if (file.size > maxSizeInMB * 1024 * 1024) {
        onError?.(`L'image ne doit pas dépasser ${maxSizeInMB}MB`);
        resetUpload();
        return;
      }

      setSelectedFile(file);

      // Créer un aperçu
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setImagePreview(preview);
        onImageChange?.(file, preview);
      };
      reader.readAsDataURL(file);
    };

    const resetUpload = () => {
      setSelectedFile(null);
      setImagePreview(null);
      onImageChange?.(null, null);
      // Reset input value
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
      }
    };

    const iconSize = Math.round(size * 0.25); // 25% de la taille du cercle

    return (
      <div
        className={`flex flex-col gap-4 ${centered ? 'items-center' : ''} ${className}`}
      >
        <div className="relative">
          <input
            ref={ref}
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            title=""
          />

          <div
            className="rounded-full bg-gray-50 border-2 border-gray-200 flex items-center justify-center overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer shadow-sm"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={iconSize} className="text-gray-400" />
            )}
          </div>
        </div>

        {/* Bouton de suppression si une image est sélectionnée */}
        {imagePreview && (
          <button
            type="button"
            onClick={resetUpload}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Supprimer l'image
          </button>
        )}
      </div>
    );
  },
);

PhotoUpload.displayName = 'PhotoUpload';

export { PhotoUpload };
export type { PhotoUploadProps };
