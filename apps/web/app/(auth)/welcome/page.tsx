'use client';

import { CircularButton } from '@/components/auth/circularButton';
import { Button } from '@/components/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="relative mx-auto h-screen max-w-[390px] bg-primary/5">
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-start pt-12 px-6">
          <h1 className="w-full text-center font-extrabold leading-[0.95] tracking-tight text-black">
            <span className="block text-[56px]">Bienvenue</span>
            <span className="block text-[56px]">Au QG Des</span>
            <span className="block text-[56px]">Pros Du</span>
            <span className="block text-[56px]">Repos</span>
          </h1>

          <div className="mt-10" onClick={() => router.push('/login')}>
            <CircularButton />
          </div>
        </div>

        <div className="relative pb-8">
          <div className="relative z-10 space-y-4 px-4">
            <Button
              variant="white"
              size="lg"
              className="w-full text-lg"
              onClick={() => router.push('/login')}
            >
              Se connecter
            </Button>
            <Button
              variant="white"
              size="lg"
              className="w-full text-lg"
              onClick={() => router.push('/register')}
            >
              S'inscrire
            </Button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
            <Image
              src="/images/auth/bottomSVG.svg"
              alt="illustration"
              width={780}
              height={380}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
