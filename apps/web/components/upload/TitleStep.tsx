'use client';

import { Button, Input } from '@/components/common';
import * as React from 'react';

interface TitleStepProps {
  value: string;
  onNext: () => void;
  onUpdate: (title: string) => void;
}

export const TitleStep: React.FC<TitleStepProps> = ({
  value,
  onNext,
  onUpdate,
}) => {
  const [title, setTitle] = React.useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTitle(newValue);
    onUpdate(newValue);
  };

  const handleContinue = () => {
    if (title.trim()) {
      onNext();
    }
  };

  const isValid = title.trim().length > 0;

  return (
    <div className="flex h-full flex-col px-6 py-8">
      {/* Titre de l'étape */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Titre</h2>
        <p className="text-foreground/60 text-base">
          Quel est le principe de votre tâche
        </p>
      </div>

      {/* Champ de saisie */}
      <div className="flex-1 flex flex-col">
        <Input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Décrivez votre tâche en quelques mots..."
          className="mb-8"
          autoFocus
        />

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
