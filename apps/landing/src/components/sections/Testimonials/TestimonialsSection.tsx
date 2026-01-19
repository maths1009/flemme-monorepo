import { SectionTitle } from '../../common/SectionTitle';
import { TestimonialCard } from './TestimonialCard';

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8f8] px-4 py-16 md:py-24">
      {/* Background Star Decoration */}
      <div className="absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg
          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] text-black"
          fill="currentColor"
          height="400"
          viewBox="0 0 24 24"
          width="400"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionTitle
          description="Découvrez ce que notre communauté de professionnels de la sieste pense de Flemme."
          label="TÉMOIGNAGES"
          title="Ils ne font rien, et ils aiment ça."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <TestimonialCard
            author="Sarah L."
            quote="J'ai gagné 15€ juste en dormant pendant mes cours d'amphi. C'est la meilleure application du monde."
            role="Étudiante"
          />
          <TestimonialCard
            author="Marc D."
            quote="Enfin une raison valable pour procrastiner. Mon productivisme toxique est guéri."
            role="Développeur"
          />
          <TestimonialCard
            author="Julie P."
            quote="Miaou. (Traduction: J'approuve ce style de vie à 100%)"
            role="Chat (par interprète)"
          />
        </div>
      </div>
    </section>
  );
}
