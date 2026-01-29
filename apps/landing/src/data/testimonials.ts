interface Testimonial {
  id: number;
  avatar: string;
  name: string;
  review: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julie',
    id: 1,
    name: 'Julie Dupont',
    review:
      "Ils ont fait mes courses en moins de temps qu'il ne m'en faut pour choisir un film sur Netflix. Légendaire !",
  },
  {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maxime',
    id: 2,
    name: 'Maxime Leroy',
    review: "Mon chien n'a jamais été aussi heureux. Moi non plus. Merci pour les grasses mat' !",
  },
  {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marc',
    id: 3,
    name: 'Marc Spector',
    review: "J'ai commandé un ménage express et quand je suis rentré, mon appart brillait plus que mon avenir. Merci !",
  },
  {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joan',
    id: 4,
    name: 'Arc Joan',
    review: "J'ai enfin rangé mon appart... sans lever le petit doigt. L'application de mes rêves !",
  },
];

export { TESTIMONIALS_DATA };
export type { Testimonial };
