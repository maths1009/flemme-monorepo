'use client';

import { Button } from '@/components/common';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/common/input-otp';
import { useRouter } from 'next/navigation';
import * as React from 'react';
``;

const TwoFAPage = () => {
  const [otp, setOtp] = React.useState('');
  const router = useRouter();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      alert('Le code doit contenir 6 chiffres');
      return;
    }
    // logique de vérification à brancher ici
    console.log('Code OTP soumis :', otp);
  }

  return (
    <div className="relative mx-auto flex h-screen max-w-[390px] flex-col items-center bg-primary/5 px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-6"
      >
        {/* Titre */}
        <h1 className="text-center text-3xl font-extrabold text-black leading-snug">
          Vérifie ton email !
        </h1>

        {/* Texte explicatif */}
        <p className="text-center text-base text-foreground/80 leading-relaxed mt-[91]">
          On vient de t’envoyer un code à 6 chiffres par mail. Entre-le
          ci-dessous pour confirmer que c’est bien toi
        </p>

        {/* Code OTP */}
        <div className="flex flex-col items-center gap-3">
          <label className="text-sm font-medium text-foreground">
            Code de vérification
          </label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Bouton de validation */}
        <Button
          type="button"
          onClick={() => {
            // For now, we just redirect without OTP verification
            // In a real application, you would verify the OTP here
            router.push('/auth/register/complete');
          }}
          className="w-full rounded-full bg-black text-white py-6 text-base font-medium"
        >
          Valider le code
        </Button>

        {/* Renvoyer le code */}
        <div className="mt-[175px] text-center text-sm text-foreground/60">
          <p>Tu n’as rien reçu ?</p>
          <button
            type="button"
            className="mt-1 font-semibold underline text-black"
            onClick={() => console.log('Renvoi du code')}
          >
            Renvoyer le code
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwoFAPage;
