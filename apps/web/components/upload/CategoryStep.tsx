'use client';

import { Button } from '@/components/common';
import Image from 'next/image';
import * as React from 'react';

interface CategoryStepProps {
  value: string;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (category: string) => void;
}

const categories = [
  { id: 'menage', label: 'Ménage', icon: '/images/upload/ménage.svg' },
  { id: 'paperasse', label: 'Paperasse', icon: '/images/upload/paperasse.svg' },
  { id: 'course', label: 'Course', icon: '/images/upload/course.svg' },
];

export const CategoryStep: React.FC<CategoryStepProps> = ({
  value,
  onNext,
  onPrevious,
  onUpdate,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState(value);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onUpdate(categoryId);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      onNext();
    }
  };

  const isValid = selectedCategory.length > 0;

  return (
    <div className="flex h-full flex-col px-6 py-8">
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Catégorie
        </h2>
        <p className="text-foreground/60 text-base">
          Dans quel type de catégorie se situe votre tâche.
        </p>
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex items-center space-x-4 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => handleCategorySelect(category.id)}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 bg-white group-hover:border-blue-300'
                }`}
              >
                {selectedCategory === category.id && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Image
                src={category.icon}
                alt={category.label}
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-medium text-foreground">
                {category.label}
              </span>
            </div>
          </label>
        ))}

        <div className="text-foreground/60 text-sm mt-6">voir plus...</div>

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
