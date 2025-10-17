'use client';

import {
  CategoryStep,
  DescriptionStep,
  LocationStep,
  PhotoStep,
  PriceStep,
  TitleStep,
} from '@/components/upload';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export type FormData = {
  title: string;
  category: string;
  photos: File[];
  description: string;
  price: string;
  location: {
    address: string;
    coordinates?: { lat: number; lng: number };
  };
};

const UploadPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    category: '',
    photos: [],
    description: '',
    price: '',
    location: {
      address: '',
    },
  });

  const handleClose = () => {
    router.back(); // Retourne à la page précédente
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 6) {
      // Rediriger vers la page de succès
      router.push('/upload/success');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TitleStep
            value={formData.title}
            onNext={handleNext}
            onUpdate={(title) => updateFormData({ title })}
          />
        );
      case 2:
        return (
          <CategoryStep
            value={formData.category}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={(category) => updateFormData({ category })}
          />
        );
      case 3:
        return (
          <PhotoStep
            value={formData.photos}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={(photos) => updateFormData({ photos })}
          />
        );
      case 4:
        return (
          <DescriptionStep
            value={formData.description}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={(description) => updateFormData({ description })}
          />
        );
      case 5:
        return (
          <PriceStep
            value={formData.price}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={(price) => updateFormData({ price })}
          />
        );
      case 6:
        return (
          <LocationStep
            value={formData.location}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={(location) => updateFormData({ location })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative mx-auto h-screen max-w-[390px] bg-primary/5">
      <div className="flex h-full flex-col">
        {/* Header avec bouton fermer et titre */}
        <div className="relative flex items-center px-6 pt-12 pb-8 bg-primary/5">
          <button
            onClick={handleClose}
            className="absolute left-6 flex h-8 w-8 items-center justify-center text-foreground hover:opacity-70 transition-opacity z-10"
            aria-label="Fermer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <h1 className="w-full text-center text-xl font-semibold text-foreground z-10 relative">
            Proposer une annonce
          </h1>
        </div>

        {/* Barre de séparation */}
        <hr className="ml-6 mr-6 border-0 h-0.5 bg-[#EFF0DE]" />

        {/* Contenu principal */}
        <div className="flex-1 pt-5">{renderCurrentStep()}</div>
      </div>
    </div>
  );
};

export default UploadPage;
