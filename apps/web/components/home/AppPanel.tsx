'use client';

import Image from 'next/image';
import * as React from 'react';

export const ApplicationPanel: React.FC = () => {
  const handleProposerTache = () => {
    window.location.href = '/upload';
  };

  return (
    <div className="px-6 mb-8">
      <div
        className="relative rounded-3xl p-6 overflow-hidden"
        style={{ backgroundColor: '#EDE5DA' }}
      >
        {/* Contenu principal */}
        <div className="flex items-center justify-between">
          {/* Texte et bouton */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
              Notre application
              <br />
              est là !
            </h2>

            <button
              onClick={handleProposerTache}
              className="bg-foreground text-white px-8 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
            >
              Proposer une tâche
            </button>
          </div>

          {/* Illustration */}
          <div className="flex-shrink-0 ml-4">
            <Image
              src="/images/home/illustration_application_presente.svg"
              alt="Illustration application"
              width={196}
              height={184}
              className="w-32 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
