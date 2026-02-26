'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/common';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/common/InputOTP';
import { useAuth } from '@/context/AuthContext';

``;

const TwoFAPage = () => {
  const [otp, setOtp] = React.useState('');
  const [errors, setErrors] = React.useState<string[]>([]);
  const router = useRouter();
  const { verifyEmail, user } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    if (otp.length !== 6) {
      setErrors(['Le code doit contenir 6 chiffres']);
      return;
    }

    try {
      await verifyEmail(parseInt(otp));
      router.push('/auth/register/complete');
    } catch (error: any) {
      import('@/lib/error-formatter').then(({ formatApiErrors }) => {
        setErrors(formatApiErrors(error));
      });
    }
  }

  return (
    <div className="relative mx-auto flex h-screen max-w-[390px] flex-col items-center bg-primary/5 px-6 py-10">
      <form className="w-full flex flex-col items-center gap-6" onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl font-extrabold text-black leading-snug">Vérifie ton email !</h1>

        <p className="text-center text-base text-foreground/80 leading-relaxed mt-[91]">
          On vient de t’envoyer un code à 6 chiffres par mail. Entre-le ci-dessous pour confirmer que c’est bien toi
        </p>

        <div className="flex flex-col items-center gap-3">
          <label className="text-sm font-medium text-foreground">Code de vérification</label>
          <InputOTP maxLength={6} onChange={value => setOtp(value)} value={otp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {errors.length > 0 && (
            <div className="text-sm text-red-500 font-medium mt-2 text-center">
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}
        </div>

        <Button className="w-full rounded-full bg-black text-white py-6 text-base font-medium" type="submit">
          Valider le code
        </Button>

        <div className="mt-[175px] text-center text-sm text-foreground/60">
          <p>Tu n’as rien reçu ?</p>
          <button
            className="mt-1 font-semibold underline text-black"
            onClick={() => console.log('Renvoi du code')}
            type="button"
          >
            Renvoyer le code
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwoFAPage;
