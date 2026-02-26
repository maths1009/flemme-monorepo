'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CircularButton } from '@/components/auth/CircularButton';

const LoginSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="relative mx-auto flex h-screen max-w-[390px] flex-col items-center bg-primary/5 px-6 py-10 space-y-10 mt-[48px]">
      <div className="mt-6">
        <Image
          alt="illustration"
          className="h-auto w-[200px]"
          height={200}
          src="/images/auth/successSVG.svg"
          width={260}
        />
      </div>

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
        <CircularButton onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default LoginSuccessPage;
