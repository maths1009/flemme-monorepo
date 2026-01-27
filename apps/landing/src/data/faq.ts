interface FaqQuestion {
  id: number;
  answer: string;
  question: string;
}

const FAQ_DATA: FaqQuestion[] = [
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

export { FAQ_DATA };
export type { FaqQuestion };
