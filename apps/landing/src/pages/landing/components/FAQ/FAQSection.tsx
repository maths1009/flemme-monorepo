import { useState } from 'react';
import { FaqItem } from './FaqItem';

interface FaqQuestion {
  id: number;
  answer: string;
  question: string;
}

const FAQ_QUESTIONS: FaqQuestion[] = [
  {
    answer:
      "On pourrait... mais notre expertise se situe plutôt dans l'art d'éviter les tâches ménagères. Pour les maths, demandez à ChatGPT (ou faites semblant d'avoir perdu votre sac).",
    id: 1,
    question: 'Est-ce que vous faites mes devoirs ?',
  },
  {
    answer:
      "Nos agents sont sympas, mais câliner, c'est hors contrat (même si on compatit). On peut vous livrer du chocolat par contre, c'est presque pareil non ?",
    id: 2,
    question: 'Puis-je vous demander de me livrer un câlin ?',
  },
  {
    answer:
      "Moins cher qu'une thérapie pour burnout domestique. Nos tarifs varient selon la mission, mais promis, on ne vous demandera pas un rein (on ne saurait pas quoi en faire).",
    id: 3,
    question: 'Combien ça coûte ?',
  },
  {
    answer:
      'Si Ethan Hunt ne peut pas le faire, nous non plus. Mais pour tout ce qui est course, ménage ou attente à la poste, on est vos meilleurs alliés.',
    id: 4,
    question: 'Que faites-vous en cas de mission impossible ?',
  },
];

function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(2);

  return (
    <section className="relative w-full overflow-hidden bg-brand-yellow py-24">
      {/* Eyes Decoration */}
      <div className="absolute left-[-45px] top-1/2 -translate-y-1/2 md:left-10 md:top-20 md:translate-y-0">
        <img
          alt="Yeux curieux"
          className="w-24 rotate-90 transition-transform duration-300 hover:scale-110 md:w-32 md:rotate-12"
          src="/double-eyes.svg"
        />
      </div>

      {/* Eyes Decoration */}
      <div className="absolute right-[-45px] top-1/2 -translate-y-1/2 md:bottom-20 md:right-10 md:top-auto md:translate-y-0">
        <img
          alt="Yeux curieux"
          className="w-24 -scale-x-100 rotate-90 transition-transform duration-300 hover:scale-110 md:w-32 md:rotate-[-12deg]"
          src="/double-eyes.svg"
        />
      </div>

      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-black/60">
            Tout ce que vous vous demandez
          </span>
          <h2 className="mb-4 font-serif text-5xl font-black text-service-bg-pink md:text-7xl">
            Questions <br /> existentielles
          </h2>
          <p className="text-lg font-medium text-black/80">Même les questions les plus bizarres méritent une réponse</p>
        </div>

        <div className="flex flex-col gap-6">
          {FAQ_QUESTIONS.map(item => (
            <FaqItem
              isOpen={openId === item.id}
              item={item}
              key={item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { FaqSection };
export type { FaqQuestion };
