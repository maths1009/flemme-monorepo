import { TESTIMONIALS_DATA } from '@/data/testimonials';
import { TestimonialCard } from './TestimonialCard';

type Testimonial = {
  avatar: string;
  id: number;
  name: string;
  review: string;
};

function TestimonialsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-bg py-24">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <img alt="" className="h-[150%] w-[150%] animate-spin-slow-reverse" src="/star.svg" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mb-20 text-center">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-black/60">
            Ce que nos héros de la paresse disent de nous
          </span>
          <h2 className="font-serif text-5xl font-black uppercase leading-none text-black md:text-7xl">
            Ils ont osé...
            <span className="text-brand-blue">et ils ont kiffé !</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {Array.from({ length: 3 }).map((_, colIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: we are obliged to use index here
            <div className="flex flex-col gap-12 md:justify-center items-center" key={colIndex}>
              {TESTIMONIALS_DATA.filter((_, i) => (i + 1) % 3 === colIndex).map((testimonial, i) => {
                const rotation = i % 2 === 0 ? '-rotate-2' : 'rotate-2';
                return <TestimonialCard data={testimonial} key={testimonial.id} rotation={rotation} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TestimonialsSection };
export type { Testimonial };
