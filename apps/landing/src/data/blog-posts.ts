export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for rich text content
  coverImage: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maxime',
      name: 'Maxime La Flemme',
    },
    content: `
      <h2>1. La micro-sieste stratégique</h2>
      <p>Pas besoin de dormir 2 heures ! 20 minutes suffisent pour recharger les batteries. Installez-vous confortablement, mettez un réveil et laissez-vous aller.</p>
      
      <h2>2. La déconnexion programmée</h2>
      <p>Accordez-vous 1h sans téléphone par jour. Votre cerveau vous remerciera de cette pause loin des notifications incessantes.</p>
      
      <h2>3. L'art de ne rien faire</h2>
      <p>Apprenez à vous ennuyer. C'est dans ces moments que naissent les meilleures idées (ou que vous réalisez que vous avez faim).</p>
      
      <h2>4. La playlist "Chill Only"</h2>
      <p>Lo-fi, Jazz, ou bruits de pluie : trouvez le son qui apaise vos neurones en ébullition.</p>
      
      <h2>5. Déléguer les corvées</h2>
      <p>C'est là qu'on intervient. Pourquoi perdre du temps à faire le ménage quand on peut... ne pas le faire ?</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=2519&auto=format&fit=crop',
    excerpt:
      'Entre les partiels, les projets et la vie sociale, difficile de trouver un moment pour souffler. Voici nos 5 meilleures astuces pour se détendre sans culpabiliser.',
    id: '1',
    publishedAt: '2024-03-15',
    readTime: '3 min',
    slug: '5-astuces-detente-pour-etudiants',
    tags: ['lifestyle', 'étudiant', 'bien-être'],
    title: '5 astuces détente pour étudiants surmenés',
  },
  {
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      name: 'Sarah Chill',
    },
    content: `
      <h2>L'efficience avant tout</h2>
      <p>Bill Gates aurait dit : "Je choisis toujours une personne paresseuse pour faire un travail difficile car elle trouvera un moyen facile de le faire".</p>
      
      <h2>La conservation d'énergie</h2>
      <p>Dans la nature, conserver son énergie est une stratégie de survie. En ville, c'est une stratégie de santé mentale.</p>
      
      <h2>La créativité par l'ennui</h2>
      <p>C'est quand on ne fait rien que l'esprit vagabonde et connecte des idées inattendues.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1541178735493-47f37a948587?q=80&w=2602&auto=format&fit=crop',
    excerpt:
      "Contrairement aux idées reçues, être 'fleur bleue' peut cacher une grande efficacité. Découvrez pourquoi les paresseux sont souvent les plus malins.",
    id: '2',
    publishedAt: '2024-03-20',
    readTime: '4 min',
    slug: 'pourquoi-la-flemme-est-une-qualite',
    tags: ['philosophie', 'productivité', 'humour'],
    title: 'Pourquoi la flemme est en fait une grande qualité',
  },
  {
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      name: 'Alexandre le Zen',
    },
    content: `
      <h2>Planifier pour mieux régner</h2>
      <p>Faire un planning réaliste est la première étape. Incluez vos pauses !</p>
      
      <h2>L'alimentation du cerveau</h2>
      <p>Fini les nouilles instantanées à tous les repas. Mangez des noix, du poisson (pour la mémoire !) et buvez de l'eau.</p>
      
      <h2>Dormir, ce n'est pas tricher</h2>
      <p>C'est pendant le sommeil que la mémoire se consolide. Nuit blanche = mémoire flanche.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop',
    excerpt:
      'Le stress monte ? Pas de panique. Voici comment hacker votre période de révision pour réussir sans vous épuiser.',
    id: '3',
    publishedAt: '2024-03-25',
    readTime: '5 min',
    slug: 'guide-survie-examen',
    tags: ['études', 'conseils', 'productivité'],
    title: "Guide de survie en période d'examens",
  },
  {
    author: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julie',
      name: 'Julie Dodo',
    },
    content: `
      <h2>1. La BU, 3ème étage, fond à gauche</h2>
      <p>Calme absolu, climatisation, et fauteuils ergonomiques. Le graal.</p>
      
      <h2>2. La pelouse derrière le gymnase</h2>
      <p>Parfait au printemps, attention aux arrosages automatiques.</p>
      
      <h2>3. La salle de pause des profs (risqué)</h2>
      <p>Si vous avez du culot, c'est là qu'est le meilleur café.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1519681393798-2f77f37da54e?q=80&w=2670&auto=format&fit=crop',
    excerpt:
      'Nous avons testé pour vous les canapés, les pelouses et les bibliothèques. Voici le top 3 des endroits où personne ne viendra vous déranger.',
    id: '4',
    publishedAt: '2024-04-01',
    readTime: '2 min',
    slug: 'les-meilleurs-spots-sieste-campus',
    tags: ['campus', 'sieste', 'fun'],
    title: 'Les meilleurs spots pour une sieste sur le campus',
  },
];
