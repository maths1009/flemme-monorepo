import { HeroBanner } from './HeroBanner';
import { HeroContent } from './HeroContent';

export function HeroSection() {
  return (
    <section className="relative flex h-[100dvh] w-full flex-col justify-end overflow-hidden bg-white">
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <HeroContent />
      </div>
      <HeroBanner />
    </section>
  );
}
