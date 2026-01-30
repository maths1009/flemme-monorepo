'use client';

import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative flex items-center w-full px-6 py-4 border-b border-gray-100">
        <button onClick={() => router.back()} className="z-10 p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
        </button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-xl font-bold text-[#1A1A1A]">Langue</h1>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => setSelectedLanguage(language.code)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 bg-white"
          >
            <span className={`text-lg font-medium ${selectedLanguage === language.code ? 'text-[#1A1A1A] font-bold' : 'text-gray-600'}`}>
              {language.name}
            </span>
            {selectedLanguage === language.code && (
              <Check className="w-6 h-6 text-[#1A1A1A]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
