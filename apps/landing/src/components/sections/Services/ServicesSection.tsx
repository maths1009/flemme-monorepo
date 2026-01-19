import { cx } from 'class-variance-authority';
import type * as React from 'react';
import { Character } from '../../common/Character';

interface ServiceCardProps {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  variant: 'green' | 'blue' | 'pink';
  reverse?: boolean;
}

function ServiceCard({ label, title, description, imageSrc, variant, reverse }: ServiceCardProps) {
  const bgColors = {
    blue: 'bg-service-blue',
    green: 'bg-service-green',
    pink: 'bg-service-pink',
  };

  const bgOpacities = {
    blue: 'bg-service-bg-blue',
    green: 'bg-service-bg-green',
    pink: 'bg-service-bg-pink',
  };

  return (
    <div
      className={cx(
        'flex flex-col min-h-[400px] border-b-2 border-black last:border-b-0 md:flex-row md:border-b-0 md:border-2 md:mb-0',
        reverse ? 'md:flex-row-reverse' : '',
      )}
    >
      {/* Text Side */}
      <div className="flex flex-1 flex-col justify-center gap-4 p-8 md:p-12 lg:p-16 bg-white">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5a4e3b]">{label}</span>
        <h3 className="text-3xl font-black leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">{title}</h3>
        <p className="text-base leading-relaxed text-black/90 md:text-lg">{description}</p>
      </div>

      {/* Visual Side */}
      <div className={cx('flex min-h-[300px] flex-1 items-center justify-center p-8 md:min-h-auto', bgColors[variant])}>
        {/* Using Character component as a visual placeholder matching the style */}
        <div className="relative">
          <Character alt={title} className="scale-90 md:scale-100" src={imageSrc} variant={variant as any} />
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="border-t-2 border-black">
      <ServiceCard
        description="Flemme tourne en arrière-plan. Plus vous restez inactif, plus vous gagnez de points. C'est aussi simple que ça."
        imageSrc="/image-7.png"
        label="CONCEPT"
        title="Ne faites rien."
        variant="green"
      />
      <ServiceCard
        description="Échangez vos points contre des réductions, des cartes cadeaux ou des dons à des associations."
        imageSrc="/image-9.png"
        label="RÉCOMPENSES"
        reverse
        title="Gagnez gros."
        variant="blue"
      />
      <ServiceCard
        description="Invitez vos amis à ne rien faire avec vous. Grimpez dans le classement des plus gros flemmards."
        imageSrc="/image-10.png"
        label="COMMUNAUTÉ"
        title="Rejoignez le mouvement."
        variant="pink"
      />
    </section>
  );
}
