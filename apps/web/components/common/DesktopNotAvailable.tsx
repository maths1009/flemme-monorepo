'use client';

import { Smartphone } from 'lucide-react';

export const DesktopNotAvailable = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f4f3] p-6 text-center font-sans antialiased text-[#1e1e1e]">
      <div className="relative mb-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#fde104] border-2 border-black shadow-[4px_8px_0px_#000]">
          <Smartphone size={48} className="text-black" />
        </div>
      </div>
      
      <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter sm:text-6xl italic leading-none">
        Application <br />
        <span className="bg-[#fde104] px-2 border-2 border-black inline-block mt-2 shadow-[4px_4px_0px_#000]">
          mobile uniquement
        </span>
      </h1>
      
      <p className="max-w-md text-[#1e1e1e] text-xl font-medium leading-tight mt-6">
        Désolé, l'application n'est pas encore disponible sur ordinateur. 
        Veuillez y accéder depuis votre téléphone pour profiter de l'expérience complète.
      </p>

      <div className="mt-12 flex flex-col gap-4 items-center">
        <div className="h-[2px] w-24 bg-black" />
        <p className="text-sm uppercase font-black tracking-widest text-black">
          Flemme App
        </p>
      </div>
    </div>
  );
};
