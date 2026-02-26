'use client';

import { Button } from '@/components/common';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface DescriptionStepProps {
  value: string;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (description: string) => void;
}

export const DescriptionStep: React.FC<DescriptionStepProps> = ({
  value,
  onNext,
  onPrevious,
  onUpdate,
}) => {
  const [description, setDescription] = React.useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);
    onUpdate(newValue);
  };

  const handleContinue = () => {
    if (description.trim()) {
      onNext();
    }
  };

  const isValid = description.trim().length > 0;

  return (
    <div className="flex h-full flex-col px-6 py-8">
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Description
        </h2>
        <p className="text-foreground/60 text-base">Décrivez votre tâche.</p>
      </div>

      <div className="flex-1 flex flex-col">
        <textarea
          value={description}
          onChange={handleInputChange}
          placeholder="Décrivez en détail votre tâche, vos attentes, les conditions particulières..."
          className={cn(
            'flex w-full border border-[#F5F5DC] bg-[#FEFEFB] px-4 py-4 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none',
            'min-h-[200px] rounded-[32px]',
          )}
          autoFocus
        />

        <div className="pt-8">
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
