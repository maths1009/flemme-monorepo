import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Testimonial } from './TestimonialsSection';

const BACK_MESSAGES = [
  { emoji: '🤫', subtitle: 'Activé', title: 'Mode Sieste' },
  { emoji: '💤', subtitle: 'Revenez plus tard', title: 'Je dors' },
  { emoji: '🛋️', subtitle: "J'ai la flemme", title: 'Trop loin' },
  { emoji: '🛑', subtitle: 'Motivation introuvable', title: 'Pause' },
  { emoji: '🔋', subtitle: 'Recharge en cours', title: 'Low Battery' },
  { emoji: '🚫', subtitle: 'Réponse par défaut', title: 'Non' },
  { emoji: '🐢', subtitle: 'Mode tortue activé', title: 'Éco. Énergie' },
  { emoji: '📅', subtitle: 'Ou après-demain...', title: 'Demain' },
  { emoji: '👻', subtitle: 'Psychologiquement absent', title: 'Pas là' },
  { emoji: '🛌', subtitle: 'Avec mon oreiller', title: 'En réunion' },
  { emoji: '🐌', subtitle: 'Veuillez patienter... longtemps', title: 'Chargement' },
  { emoji: '🍕', subtitle: 'Occupé à manger', title: 'Priorités' },
  { emoji: '🎮', subtitle: 'Je finis ma partie', title: 'AFK' },
  { emoji: '📵', subtitle: 'Ne pas déranger', title: 'Mode Avion' },
];

function TestimonialCard({ data, rotation }: { data: Testimonial; rotation: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const randomMessage = useMemo(() => {
    const index = Math.floor(Math.random() * BACK_MESSAGES.length);
    return BACK_MESSAGES[index];
  }, []);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(prev => !prev);
      setIsAnimating(true);
    }
  }

  return (
    <button
      className={cn(
        'relative h-[220px] w-full max-w-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 [perspective:1000px] md:h-[300px]',
        rotation,
      )}
      onClick={handleFlip}
      type="button"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        className="relative h-full w-full [transform-style:preserve-3d]"
        onAnimationComplete={() => setIsAnimating(false)}
        transition={{ damping: 20, duration: 0.6, stiffness: 260, type: 'spring' }}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="flex h-full flex-col rounded-xl border-2 border-black bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-6 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-3 flex items-center justify-between md:mb-6">
              <div className="flex items-center gap-2 md:gap-4">
                <img
                  alt={data.name}
                  className="h-10 w-10 rounded-full border border-black bg-gray-100 object-cover md:h-12 md:w-12"
                  src={data.avatar}
                />
                <span className="text-base font-bold text-black md:text-lg">{data.name}</span>
              </div>
              <Quote className="h-6 w-6 fill-brand-blue text-brand-blue opacity-50 md:h-8 md:w-8" />
            </div>
            <p className="text-sm font-medium leading-relaxed text-black/80 md:text-lg">"{data.review}"</p>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 h-full w-full [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-black bg-brand-yellow p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-6 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="mb-2 text-4xl md:mb-4 md:text-6xl">{randomMessage.emoji}</span>
            <p className="font-serif text-xl font-black uppercase text-black md:text-2xl">{randomMessage.title}</p>
            <p className="text-center text-sm font-medium text-black/80 md:text-base">{randomMessage.subtitle}</p>
          </div>
        </div>
      </motion.div>
    </button>
  );
}

export { TestimonialCard };
