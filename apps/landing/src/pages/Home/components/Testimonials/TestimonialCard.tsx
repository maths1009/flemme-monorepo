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
        'relative h-[300px] w-full max-w-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 [perspective:1000px]',
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
          <div className="flex h-full flex-col rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  alt={data.name}
                  className="h-12 w-12 rounded-full border border-black bg-gray-100 object-cover"
                  src={data.avatar}
                />
                <span className="text-lg font-bold text-black">{data.name}</span>
              </div>
              <Quote className="h-8 w-8 fill-brand-blue text-brand-blue opacity-50" />
            </div>
            <p className="text-lg font-medium leading-relaxed text-black/80">"{data.review}"</p>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 h-full w-full [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-black bg-brand-yellow p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="mb-4 text-6xl">{randomMessage.emoji}</span>
            <p className="font-serif text-2xl font-black uppercase text-black">{randomMessage.title}</p>
            <p className="text-center font-medium text-black/80">{randomMessage.subtitle}</p>
          </div>
        </div>
      </motion.div>
    </button>
  );
}

export { TestimonialCard };
