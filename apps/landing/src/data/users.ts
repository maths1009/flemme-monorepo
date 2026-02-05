type Department = 'tech' | 'business' | 'marketing' | 'operations';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  bio: string;
  parentId?: string;
  department?: Department;
  order?: number;
}

interface UserNode extends User {
  children: UserNode[];
}

const generateAvatar = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
const generateBio = (name: string, dept: string) => `<p>${name} est un membre clé de l'équipe ${dept} chez Flemme.</p>`;

const USERS: User[] = [
  {
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQFqOQKxEW704A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710232335696?e=1772064000&v=beta&t=z9mJKVoC1eE-l3kmxPUPGS1ljbD5avG3B88fQh_Pz3Q',
    bio: `<h2>CEO & Co-fondateur</h2>
<p>Mathis est le co-fondateur de Flemme, une plateforme pionnière dans la « Lazy Economy » en France. Fort d'une expertise pointue dans le développement de places de marché bifaces (C2C), il a structuré la vision de l'entreprise autour de la transformation des corvées quotidiennes en opportunités de lien social et d'entraide communautaire.</p>
<p>Son approche repose sur une conviction profonde : la technologie doit servir la proximité territoriale. Mathis a piloté la conception de la chaîne de valeur de Flemme, en veillant à ce que le développement technologique assure une interface fluide et intuitive, capable d'attirer un large public, des étudiants aux familles.</p>
<h3>Spécialisations Clés</h3>
<p>Mathis intervient régulièrement sur les piliers fondamentaux de l'économie de plateforme moderne :</p>
<ul>
<li><strong>Ingénierie de la confiance (Trust Building)</strong> : Expert dans la mise en place de mécanismes de vérification et de systèmes de notation (profils vérifiés), il considère la confiance comme le moteur indispensable de la rétention utilisateur dans les échanges entre particuliers.</li>
<li><strong>Optimisation du portefeuille clients (RFM)</strong> : Spécialiste de la segmentation prédictive, Mathis utilise les leviers de Récence, Fréquence et Montant pour piloter la croissance de la plateforme et maximiser la valeur vie client (ARPU).</li>
<li><strong>Stratégie de croissance « Bootstrap »</strong> : Architecte d'un modèle économique agile, il prône une gestion rigoureuse de la trésorerie et un marketing de guérilla pour assurer la pérennité des startups à impact positif.</li>
</ul>
<h3>Vision RSE et impact social</h3>
<p>Au-delà de la rentabilité, Mathis inscrit son action dans une démarche de responsabilité sociétale (RSE). Il travaille activement à :</p>
<ul>
<li>Favoriser la solidarité intergénérationnelle en connectant des étudiants et des seniors via des services de proximité.</li>
<li>Promouvoir la sobriété numérique par le choix d'hébergements éco-responsables et le développement de fonctionnalités à faible impact environnemental.</li>
<li>Réduire l'empreinte carbone en limitant les trajets grâce à une mise en relation ultra-locale (géolocalisation de quartier).</li>
</ul>
<h3>Contributions notables</h3>
<p>En tant que leader d'opinion sur la « flemme décomplexée », Mathis décrypte les tendances du marché, notamment l'essor du crowdsourcing de micro-tâches en France (marché estimé à 10,3 millions USD avec un CAGR de 14,9%). Il est l'auteur de guides stratégiques visant à humaniser les échanges digitaux, affirmant que chaque transaction est avant tout un échange humain.</p>`,
    department: 'business',
    firstName: 'Mathis',
    id: 'mathis-brangeon',
    lastName: 'Brangeon',
    order: 1,
    role: 'CEO & Co-fondateur',
  },

  // Niveau 1 - C-Level (4 managers sous Mathis)
  {
    avatar: generateAvatar('SophieMartin'),
    bio: generateBio('Sophie Martin', 'Tech'),
    department: 'tech',
    firstName: 'Sophie',
    id: 'sophie-martin',
    lastName: 'Martin',
    order: 1,
    parentId: 'mathis-brangeon',
    role: 'CTO - Chief Technology Officer',
  },
  {
    avatar: generateAvatar('LucasBernard'),
    bio: generateBio('Lucas Bernard', 'Business'),
    department: 'operations',
    firstName: 'Lucas',
    id: 'lucas-bernard',
    lastName: 'Bernard',
    order: 2,
    parentId: 'mathis-brangeon',
    role: 'COO - Chief Operating Officer',
  },
  {
    avatar: generateAvatar('EmmaDubois'),
    bio: generateBio('Emma Dubois', 'Marketing'),
    department: 'marketing',
    firstName: 'Emma',
    id: 'emma-dubois',
    lastName: 'Dubois',
    order: 3,
    parentId: 'mathis-brangeon',
    role: 'CMO - Chief Marketing Officer',
  },
  {
    avatar: generateAvatar('HugoMoreau'),
    bio: generateBio('Hugo Moreau', 'Business'),
    department: 'business',
    firstName: 'Hugo',
    id: 'hugo-moreau',
    lastName: 'Moreau',
    order: 4,
    parentId: 'mathis-brangeon',
    role: 'CFO - Chief Financial Officer',
  },

  // Niveau 2 - Sous CTO (Sophie Martin)
  {
    avatar: generateAvatar('NathanLaurent'),
    bio: generateBio('Nathan Laurent', 'Tech'),
    department: 'tech',
    firstName: 'Nathan',
    id: 'nathan-laurent',
    lastName: 'Laurent',
    order: 1,
    parentId: 'sophie-martin',
    role: 'Lead Backend Developer',
  },
  {
    avatar: generateAvatar('ChloeSimon'),
    bio: generateBio('Chloé Simon', 'Tech'),
    department: 'tech',
    firstName: 'Chloé',
    id: 'chloe-simon',
    lastName: 'Simon',
    order: 2,
    parentId: 'sophie-martin',
    role: 'Lead Frontend Developer',
  },
  {
    avatar: generateAvatar('LeoMichel'),
    bio: generateBio('Léo Michel', 'Tech'),
    department: 'tech',
    firstName: 'Léo',
    id: 'leo-michel',
    lastName: 'Michel',
    order: 3,
    parentId: 'sophie-martin',
    role: 'DevOps Lead',
  },

  // Niveau 2 - Sous COO (Lucas Bernard)
  {
    avatar: generateAvatar('ManonGarcia'),
    bio: generateBio('Manon Garcia', 'Operations'),
    department: 'operations',
    firstName: 'Manon',
    id: 'manon-garcia',
    lastName: 'Garcia',
    order: 1,
    parentId: 'lucas-bernard',
    role: 'Operations Manager',
  },
  {
    avatar: generateAvatar('ThomasPetit'),
    bio: generateBio('Thomas Petit', 'Operations'),
    department: 'operations',
    firstName: 'Thomas',
    id: 'thomas-petit',
    lastName: 'Petit',
    order: 2,
    parentId: 'lucas-bernard',
    role: 'Customer Success Lead',
  },

  // Niveau 2 - Sous CMO (Emma Dubois)
  {
    avatar: generateAvatar('LeaRoux'),
    bio: generateBio('Léa Roux', 'Marketing'),
    department: 'marketing',
    firstName: 'Léa',
    id: 'lea-roux',
    lastName: 'Roux',
    order: 1,
    parentId: 'emma-dubois',
    role: 'Growth Lead',
  },
  {
    avatar: generateAvatar('JulieBlanc'),
    bio: generateBio('Julie Blanc', 'Marketing'),
    department: 'marketing',
    firstName: 'Julie',
    id: 'julie-blanc',
    lastName: 'Blanc',
    order: 2,
    parentId: 'emma-dubois',
    role: 'Content Manager',
  },

  // Niveau 3 - Sous Lead Backend (Nathan)
  {
    avatar: generateAvatar('AntoineDurand'),
    bio: generateBio('Antoine Durand', 'Tech'),
    department: 'tech',
    firstName: 'Antoine',
    id: 'antoine-durand',
    lastName: 'Durand',
    order: 1,
    parentId: 'nathan-laurent',
    role: 'Backend Developer',
  },
  {
    avatar: generateAvatar('ClaireLeroy'),
    bio: generateBio('Claire Leroy', 'Tech'),
    department: 'tech',
    firstName: 'Claire',
    id: 'claire-leroy',
    lastName: 'Leroy',
    order: 2,
    parentId: 'nathan-laurent',
    role: 'Backend Developer',
  },

  // Niveau 3 - Sous Lead Frontend (Chloé)
  {
    avatar: generateAvatar('PaulGirard'),
    bio: generateBio('Paul Girard', 'Tech'),
    department: 'tech',
    firstName: 'Paul',
    id: 'paul-girard',
    lastName: 'Girard',
    order: 1,
    parentId: 'chloe-simon',
    role: 'Frontend Developer',
  },
  {
    avatar: generateAvatar('MarieFaure'),
    bio: generateBio('Marie Faure', 'Tech'),
    department: 'tech',
    firstName: 'Marie',
    id: 'marie-faure',
    lastName: 'Faure',
    order: 2,
    parentId: 'chloe-simon',
    role: 'Frontend Developer',
  },
  {
    avatar: generateAvatar('AlexBonnet'),
    bio: generateBio('Alex Bonnet', 'Tech'),
    department: 'tech',
    firstName: 'Alex',
    id: 'alex-bonnet',
    lastName: 'Bonnet',
    order: 3,
    parentId: 'chloe-simon',
    role: 'UI/UX Developer',
  },

  // Niveau 3 - Sous Growth Lead (Léa)
  {
    avatar: generateAvatar('MarcFontaine'),
    bio: generateBio('Marc Fontaine', 'Marketing'),
    department: 'marketing',
    firstName: 'Marc',
    id: 'marc-fontaine',
    lastName: 'Fontaine',
    order: 1,
    parentId: 'lea-roux',
    role: 'Growth Hacker',
  },
  {
    avatar: generateAvatar('CamilleRousseau'),
    bio: generateBio('Camille Rousseau', 'Marketing'),
    department: 'marketing',
    firstName: 'Camille',
    id: 'camille-rousseau',
    lastName: 'Rousseau',
    order: 2,
    parentId: 'lea-roux',
    role: 'Social Media Manager',
  },
];

export { USERS };
export type { User, UserNode, Department };
