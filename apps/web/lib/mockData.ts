// Données mockées centralisées pour les annonces

export interface User {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  avatar: string;
}

export interface Advert {
  id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  location: string;
  image: string;
  images: string[];
  user: User;
  category: string;
}

// Utilisateurs mockés
export const mockUsers: Record<string, User> = {
  user1: {
    id: 'user1',
    name: 'camille.cpla',
    rating: 5,
    reviews: 102,
    avatar: '',
  },
  user2: {
    id: 'user2',
    name: 'pierre.martin',
    rating: 4.8,
    reviews: 87,
    avatar: '',
  },
  user3: {
    id: 'user3',
    name: 'marie.dubois',
    rating: 4.9,
    reviews: 156,
    avatar: '',
  },
  user4: {
    id: 'user4',
    name: 'alex.rousseau',
    rating: 4.7,
    reviews: 43,
    avatar: '',
  },
};

// Annonces mockées complètes
export const mockAdverts: Record<string, Advert> = {
  '1': {
    id: '1',
    title: 'Acheter du beurre',
    description:
      "Salut ! Je cherche quelqu'un pour m'acheter du beurre doux à la boulangerie du coin. C'est pour faire des crêpes ce soir ! Merci d'avance pour votre aide.",
    price: 5,
    date: '15/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user2,
    category: 'courses',
  },
  '2': {
    id: '2',
    title: 'Nettoyer ma voiture',
    description:
      "Ma voiture a besoin d'un bon nettoyage intérieur et extérieur. Elle est garée devant chez moi, tous les produits sont fournis. Ça prend environ 1h30.",
    price: 20,
    date: '16/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user3,
    category: 'ménage',
  },
  '3': {
    id: '3',
    title: 'Déjeuner avec moi',
    description:
      "Je cherche quelqu'un de sympa pour partager un déjeuner au restaurant. J'aime découvrir de nouveaux endroits et rencontrer de nouvelles personnes !",
    price: 8,
    date: '17/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user4,
    category: 'social',
  },
  '4': {
    id: '4',
    title: 'Promener mon chien Croquette',
    description:
      "Salut ! Je cherche quelqu'un de sympa et fiable pour promener Croquette, ma chienne pleine de vie (et un peu têtue parfois). Elle adore flâner, tout ce qu'il faut c'est de la patience et de l'amour pour les animaux !",
    price: 24,
    date: '24/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user1,
    category: 'animaux',
  },
  '5': {
    id: '5',
    title: 'Arroser mes plantes',
    description:
      "Je pars en weekend et j'ai besoin de quelqu'un pour arroser mes plantes d'intérieur. C'est très simple, juste 2-3 plantes à arroser.",
    price: 8,
    date: '18/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user1,
    category: 'jardinage',
  },
  '6': {
    id: '6',
    title: 'Nourrir mon chat',
    description:
      "Je cherche quelqu'un pour nourrir mon chat Minou pendant mes vacances. Il est très gentil et mange deux fois par jour.",
    price: 12,
    date: '20/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user1,
    category: 'animaux',
  },
  '7': {
    id: '7',
    title: 'Acheter du pain',
    description:
      "J'ai besoin de quelqu'un pour m'acheter une baguette et des croissants à la boulangerie. C'est pour le petit-déjeuner de demain !",
    price: 4,
    date: '19/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user2,
    category: 'courses',
  },
  '8': {
    id: '8',
    title: 'Ranger mon garage',
    description:
      "Mon garage est un peu en désordre et j'aimerais de l'aide pour le ranger. Ça prend environ 2h et je fournis tout le matériel.",
    price: 30,
    date: '21/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user2,
    category: 'ménage',
  },
  '9': {
    id: '9',
    title: 'Faire mes courses',
    description:
      "Je cherche quelqu'un pour faire mes courses hebdomadaires. J'ai une liste toute prête et je rembourse tous les frais.",
    price: 15,
    date: '22/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user3,
    category: 'courses',
  },
  '10': {
    id: '10',
    title: 'Nettoyer mes vitres',
    description:
      "Mes vitres ont besoin d'un bon nettoyage. J'ai tous les produits nécessaires, il faut juste quelqu'un de motivé !",
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    date: '23/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    price: 18,
    user: mockUsers.user3,
    category: 'ménage',
  },
  '11': {
    id: '11',
    title: 'Prendre un café',
    description:
      "J'aimerais rencontrer quelqu'un autour d'un café pour discuter et passer un bon moment. Je connais un super endroit !",
    price: 6,
    date: '25/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user4,
    category: 'social',
  },
  '12': {
    id: '12',
    title: 'Aller au cinéma',
    description:
      "Je cherche quelqu'un pour m'accompagner au cinéma voir le dernier film d'action. Les places sont à ma charge !",
    price: 10,
    date: '26/04/2025',
    location: 'Angers (49000)',
    image: '/images/home/mock/image.png',
    images: [
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
      '/images/home/mock/image.png',
    ],
    user: mockUsers.user4,
    category: 'social',
  },
};

// Fonction pour récupérer une annonce par ID
export const getAdvertById = (id: string): Advert | null => {
  return mockAdverts[id] || null;
};

// Fonction pour récupérer toutes les annonces
export const getAllAdverts = (): Advert[] => {
  return Object.values(mockAdverts);
};

// Fonction pour récupérer les annonces liées (même utilisateur ou même catégorie)
export const getRelatedAdverts = (
  currentId: string,
  limit: number = 3,
): Advert[] => {
  const currentAdvert = getAdvertById(currentId);
  if (!currentAdvert) return [];

  const allAdverts = getAllAdverts();
  const related = allAdverts.filter(
    (advert) =>
      advert.id !== currentId &&
      (advert.user.id === currentAdvert.user.id ||
        advert.category === currentAdvert.category),
  );

  return related.slice(0, limit);
};

// Fonction pour récupérer des annonces suggérées
export const getSuggestedAdverts = (
  currentId: string,
  limit: number = 3,
): Advert[] => {
  const allAdverts = getAllAdverts();
  const suggested = allAdverts.filter((advert) => advert.id !== currentId);

  return suggested.slice(0, limit);
};
