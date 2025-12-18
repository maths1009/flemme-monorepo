'use client';

import { Clock, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

export const SecurityInfoSection: React.FC = () => {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center space-x-3 text-sm text-gray-600">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(78, 119, 207, 0.3)' }}
        >
          <Shield className="w-5 h-5 text-gray-800" />
        </div>
        <span>Paiement sécurisé</span>
        <div className="ml-auto">
          <Image
            src="/images/adverts/paymentMethod.svg"
            alt="Méthodes de paiement"
            width={200}
            height={32}
            className="h-8 w-auto"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 text-sm text-gray-600">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(78, 119, 207, 0.3)' }}
        >
          <Clock className="w-5 h-5 text-gray-800" />
        </div>
        <span>Remboursé dans un délai de 14 jours</span>
      </div>

      <div className="flex items-center space-x-3 text-sm text-gray-600">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(78, 119, 207, 0.3)' }}
        >
          <Users className="w-5 h-5 text-gray-800" />
        </div>
        <span>Protection des utilisateurs</span>
      </div>
    </div>
  );
};
