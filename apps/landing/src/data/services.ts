interface ServiceData {
  id: number;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: 'items-end' | 'items-center';
  label: string;
  theme: 'green' | 'blue' | 'pink';
  title: string;
}

const SERVICES_DATA: ServiceData[] = [
  {
    description:
      "Courses, ménage, promenade de chien... On gère tout pendant que vous perfectionnez l'art de la sieste. Le multitâche ? C'est notre sport préféré !",
    id: 1,
    image: '/mascot-1.svg',
    imageAlt: 'Mascotte verte',
    imagePosition: 'items-end',
    label: "PLUS D'EXCUSES !",
    theme: 'green',
    title: 'On fait tout... sauf votre jogging.',
  },
  {
    description:
      "Confiez-nous vos corvées et concentrez-vous sur l'essentiel : binge-watcher votre série préférée sans interruption. Vous le méritez.",
    id: 2,
    image: '/mascot-3.svg',
    imageAlt: 'Mascotte blob violet',
    imagePosition: 'items-center',
    label: 'PROFITEZ SANS CULPABILITÉ',
    theme: 'blue',
    title: 'La flemme ? force sous-estimée.',
  },
  {
    description:
      'Nos agents secrets du quotidien sont prêts à affronter les pires missions : du frigo vide au linge en otage dans le panier.',
    id: 3,
    image: '/mascot-4.svg',
    imageAlt: 'Mascotte triangle rose',
    imagePosition: 'items-end',
    label: "EXPERTS CERTIFIÉS EN 'MISSION IMPOSSIBLE'",
    theme: 'pink',
    title: 'Vos tâches, notre aventure!',
  },
];

export { SERVICES_DATA };
export type { ServiceData };
