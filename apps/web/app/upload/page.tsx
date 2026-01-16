'use client';

import {
  CategoryStep,
  DescriptionStep,
  LocationStep,
  PhotoStep,
  PriceStep,
  TitleStep,
} from '@/components/upload';
import { X } from 'lucide-react';
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
    <div className="relative w-full h-screen bg-primary/5">
      <div className="flex h-full flex-col">
        {/* Header avec titre */}
        <div className="relative flex items-center px-6 pt-5 pb-8 bg-primary/5">
          {/* Bouton fermer aligné */}
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center text-foreground hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <h1 className="flex-1 text-center text-xl font-semibold text-foreground">
            Proposer une annonce
          </h1>

          {/* Espace pour équilibrer (même largeur que le bouton) */}
          <div className="w-8 h-8"></div>
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
