'use client';

import { Button } from '@/components/common';
import * as React from 'react';

interface PriceStepProps {
  value: string;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (price: string) => void;
}

export const PriceStep: React.FC<PriceStepProps> = ({
  value,
  onNext,
  onPrevious,
  onUpdate,
}) => {
  const [price, setPrice] = React.useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Permettre seulement les chiffres et le point décimal
    if (/^\d*\.?\d*$/.test(newValue) || newValue === '') {
      setPrice(newValue);
      onUpdate(newValue);
    }
  };

  const handleContinue = () => {
    if (price.trim() && parseFloat(price) > 0) {
      onNext();
    }
  };

  const isValid = price.trim().length > 0 && parseFloat(price) > 0;

  return (
    <div className="flex h-full flex-col px-6 py-8">
      {/* Titre de l'étape */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Quel est votre prix ?
        </h2>
        <p className="text-foreground/60 text-base">Fixez votre tarif</p>
      </div>

      {/* Champ de prix */}
      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <div
            className="flex items-center border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            style={{ borderRadius: '24px' }}
          >
            <input
              type="text"
              value={price}
              onChange={handleInputChange}
              placeholder="Votre prix de vente"
              className="flex-1 px-4 py-3 text-base bg-transparent border-none outline-none placeholder-gray-400"
              autoFocus
            />
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="px-4 text-gray-600 text-base font-medium">€</div>
          </div>
        </div>

        {/* Suggestions de prix (optionnel) */}
        <div className="mb-8">
          <p className="text-sm text-foreground/60 mb-4">Suggestions :</p>
          <div className="flex flex-wrap gap-2">
            {['10', '15', '20', '25', '30'].map((suggestedPrice) => (
              <button
                key={suggestedPrice}
                onClick={() => {
                  setPrice(suggestedPrice);
                  onUpdate(suggestedPrice);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {suggestedPrice}€
              </button>
            ))}
          </div>
        </div>

        {/* Bouton continuer - fixé en bas */}
        <div className="">
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
