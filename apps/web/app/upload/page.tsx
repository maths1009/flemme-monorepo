'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { CategoryStep, DescriptionStep, LocationStep, PhotoStep, PriceStep, TitleStep } from '@/components/upload';
import { fetchClient } from '@/lib/api';

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
    category: '',
    description: '',
    location: {
      address: '',
    },
    photos: [],
    price: '',
    title: '',
  });

  const handleClose = () => {
    router.back();
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = async () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 6) {
      
      setIsLoading(true);
      try {
        await fetchClient('/annonces', {
          body: JSON.stringify({
            description: formData.description,
            
            latitude: formData.location.coordinates?.lat || 0,
            longitude: formData.location.coordinates?.lng || 0,
            price: Number(formData.price),
            title: formData.title,
          }),
          method: 'POST',
        });
        router.push('/upload/success');
      } catch (error) {
        console.error('Failed to create annonce', error);
        
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <TitleStep onNext={handleNext} onUpdate={title => updateFormData({ title })} value={formData.title} />;
      case 2:
        return (
          <CategoryStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={category => updateFormData({ category })}
            value={formData.category}
          />
        );
      case 3:
        return (
          <PhotoStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={photos => updateFormData({ photos })}
            value={formData.photos}
          />
        );
      case 4:
        return (
          <DescriptionStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={description => updateFormData({ description })}
            value={formData.description}
          />
        );
      case 5:
        return (
          <PriceStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={price => updateFormData({ price })}
            value={formData.price}
          />
        );
      case 6:
        return (
          <LocationStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            onUpdate={location => updateFormData({ location })}
            value={formData.location}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen bg-primary/5">
      <div className="flex h-full flex-col">
        
        <div className="relative flex items-center px-6 pt-5 pb-8 bg-primary/5">
          
          <button
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center text-foreground hover:opacity-70 transition-opacity cursor-pointer"
            onClick={handleClose}
          >
            <X className="w-6 h-6" />
          </button>

          <h1 className="flex-1 text-center text-xl font-semibold text-foreground">Proposer une annonce</h1>

          <div className="w-8 h-8"></div>
        </div>

        <hr className="ml-6 mr-6 border-0 h-0.5 bg-[#EFF0DE]" />

        <div className="flex-1 pt-5">{renderCurrentStep()}</div>
      </div>
    </div>
  );
};

export default UploadPage;
