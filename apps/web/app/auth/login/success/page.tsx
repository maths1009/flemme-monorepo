'use client';

import { CircularButton } from '@/components/auth/CircularButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="relative mx-auto flex h-screen max-w-[390px] flex-col items-center bg-primary/5 px-6 py-10 space-y-10 mt-[48px]">
      {/* Illustration en haut */}
      <div className="mt-6">
        <Image
          src="/images/auth/successSVG.svg"
          alt="illustration"
          width={260}
          height={200}
          className="h-auto w-[200px]"
        />
      </div>

      {/* Texte centré */}
      <div className="text-center">
        <p className="text-[48px] font-extrabold leading-[1.15] tracking-tight text-black">
          Hop, c'est fait !<br />
          Maintenant,
          <br />
          détends-toi.
        </p>
      </div>

      {/* Bouton rond en bas */}
      <div className="mb-8">
        <div onClick={() => router.push('/dashboard')}>
          <CircularButton />
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessPage;
