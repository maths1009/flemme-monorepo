'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  return (
    <div className="w-full bg-white px-6 py-4">
      {/* Navigation icons et bouton */}
      <div className="flex items-center justify-between mb-6">
        {/* Icônes de navigation */}
        <div className="flex items-center space-x-4">
          {/* Icône profil */}
          <Link href="/profil" className="p-2">
            <Image
              src="/images/home/account.svg"
              alt="Profil"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Link>

          {/* Icône chat */}
          <Link href="/messages" className="p-2">
            <Image
              src="/images/home/discuss.svg"
              alt="Discussion"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Link>

          {/* Icône recherche */}
          <Link href="/search" className="p-2">
            <Image
              src="/images/home/search.svg"
              alt="Recherche"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Link>
        </div>

        {/* Bouton Proposer une tâche */}
        <Link href="/upload">
          <Button variant="secondary" className="text-sm">
            Proposer une tâche
          </Button>
        </Link>
      </div>
    </div>
  );
};
