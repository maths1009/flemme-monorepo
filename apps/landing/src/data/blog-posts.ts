import dayjs from 'dayjs';
import { USERS, type User } from './users';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  coverImage: string;
  author: User;
  content: string;
  layout: 'modern-clean' | 'visual-immersive';
}

const BLOG_POSTS: BlogPost[] = [
  {
    author: USERS.MATHIS,
    content: `
      <p>Nous vivons dans une société qui glorifie l'occupation. Être "occupé" est devenu un badge d'honneur, un signe d'importance. Mais et si la clé de la véritable productivité n'était pas de faire plus, mais de faire moins ?</p>
      
      <h2>La puissance du vide</h2>
      <p>Le cerveau humain n'est pas conçu pour un focus constant. Comme un muscle, il a besoin de repos pour récupérer et se renforcer. Ne rien faire, ce n'est pas être paresseux, c'est laisser de l'espace à votre esprit pour vagabonder, faire des connexions inattendues et consolider les informations.</p>
      
      <p>C'est souvent sous la douche ou en marchant sans but que nous avons nos meilleures idées. Pourquoi ? Parce que nous ne forcions pas le processus. Nous permettions simplement à notre subconscient de travailler en arrière-plan.</p>
      
      <h2>La procrastination stratégique</h2>
      <p>Il existe une différence fondamentale entre la procrastination d'évitement (par peur ou ennui) et la procrastination stratégique. Cette dernière consiste à retarder délibérément une tâche pour laisser mariner les idées.</p>
      
      <blockquote>"Je ne remets pas au lendemain, je donne à mon idée le temps de mûrir."</blockquote>
      
      <p>La prochaine fois que vous sentez la culpabilité monter parce que vous ne faites "rien", rappelez-vous : vous êtes peut-être en train de réaliser votre travail le plus important.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=2068',
    excerpt:
      'Découvrez pourquoi la procrastination stratégique peut être votre meilleur atout pour une productivité durable et sans stress.',
    id: '1',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-01-02').toISOString(),
    slug: 'art-subtil-ne-rien-faire',
    tags: ['productivité', 'mindset'],
    title: 'L’art subtil de ne rien faire (et de le faire bien)',
  },
  {
    author: USERS.MATHIS,
    content: `
      <h2>Le piège de l'infini</h2>
      <p>Vous connaissez ce sentiment : vous avez coché 15 tâches aujourd'hui, mais la liste en contient toujours 20 autres. C'est l'effet hydre de la to-do list moderne. Pour chaque tâche accomplie, deux autres semblent apparaître.</p>
      
      <p>Le problème n'est pas votre capacité à travailler, mais la nature même de la liste. Elle mélange l'urgent, l'important, et le trivial. "Acheter du pain" côtoie "Refondre la stratégie marketing". C'est épuisant cognitivement.</p>
      
      <h2>La méthode 1-3-5</h2>
      <p>Pour retrouver la sérénité, essayez la règle du 1-3-5 :</p>
      <ul>
        <li><strong>1</strong> grosse tâche importante (celle qui vous fait avancer vraiment)</li>
        <li><strong>3</strong> tâches moyennes (nécessaires mais gérables)</li>
        <li><strong>5</strong> petites tâches (admin, emails, etc.)</li>
      </ul>
      
      <p>Une fois ces 9 tâches finies, arrêtez-vous. C'est fini. Vous avez gagné votre journée.</p>
      
      <h2>L'art de la "Not-To-Do List"</h2>
      <p>Parfois, le plus efficace est de décider explicitement ce que vous ne ferez PAS. Lister ces distractions vous aide à les identifier lorsqu'elles tentent de saboter votre journée. Dites non à l'accessoire pour dire oui à l'essentiel.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072',
    excerpt: 'Arrêtez de cocher des cases. Apprenez à prioriser l’essentiel et à laisser tomber le superflu.',
    id: '2',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-01-05').toISOString(),
    slug: 'todo-list-epuise',
    tags: ['organisation', 'stress'],
    title: 'Pourquoi votre to-do list vous épuise',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>Nous touchons notre téléphone en moyenne 2 617 fois par jour. C'est effrayant, non ? Notre attention est devenue la marchandise la plus précieuse de l'économie moderne, et nous la donnons gratuitement.</p>
      
      <h2>Le coût caché de la connexion permanente</h2>
      <p>La notification constante fragmente notre pensée. Il faut environ 23 minutes pour se reconcentrer pleinement après une interruption. Si vous êtes interrompu toutes les 10 minutes, vous ne travaillez jamais en profondeur.</p>
      
      <h2>3 étapes pour une détox douce</h2>
      <p>Le minimalisme digital ne signifie pas jeter son smartphone, mais l'utiliser avec intention.</p>
      <ol>
        <li><strong>Désactiver toutes les notifications et sons</strong> (sauf appels et SMS). Votre téléphone ne devrait pas vibrer parce que quelqu'un a aimé une photo de chat.</li>
        <li><strong>Bannir le téléphone de la chambre.</strong> Achetez un réveil. Sérieusement.</li>
        <li><strong>La règle du "Pas d'écran avant le café".</strong> Donnez à votre cerveau le temps de s'éveiller avant de le bombarder d'informations.</li>
      </ol>

      <p>En reprenant le contrôle, vous ne gagnez pas seulement du temps. Vous gagnez de la clarté mentale, et c'est un super-pouvoir dans le monde d'aujourd'hui.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&q=80&w=2070',
    excerpt: 'Comment reprendre le contrôle de votre attention dans un monde hyper-connecté.',
    id: '3',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-01-08').toISOString(),
    slug: 'minimalisme-digital',
    tags: ['digital', 'lifestyle'],
    title: 'Le minimalisme digital : moins d’écrans, plus de vie',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>Winston Churchill, Albert Einstein, John F. Kennedy. Qu'ont-ils en commun ? Ils étaient des adeptes fervents de la sieste. Ce que notre culture perçoit souvent comme de la paresse est en réalité un outil biologique puissant de redémarrage système.</p>
      
      <h2>La science du "Power Nap"</h2>
      <p>Une sieste de 10 à 20 minutes suffit pour booster la vigilance et l'humeur. Elle agit comme un nettoyage de la mémoire vive (RAM) de votre cerveau, effaçant la fatigue de la matinée pour faire place à de nouvelles informations.</p>
      
      <h2>Le "Nappuccino" (Sieste + Café)</h2>
      <p>Voici une technique de pro pour les jours difficiles :</p>
      <ol>
        <li>Buvez un café rapidement.</li>
        <li>Couchez-vous immédiatement pour 20 minutes (mettez un réveil !).</li>
        <li>Au réveil, la caféine commence juste à faire effet, doublant la sensation de fraîcheur.</li>
      </ol>
      
      <p>Alors fermez la porte de votre bureau, mettez vos écouteurs, et offrez-vous ce luxe productif. Votre boss vous remerciera (peut-être).</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=2070',
    excerpt:
      'Dormir au travail ? C’est peut-être la clé de votre prochaine promotion (ou du moins de votre santé mentale).',
    id: '4',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-01-12').toISOString(),
    slug: 'sieste-productivite',
    tags: ['santé', 'énergie'],
    title: 'La sieste : l’outil de productivité ultime',
  },
  {
    author: USERS.MATHIS,
    content: `
      <h2>Pourquoi disons-nous "oui" ?</h2>
      <p>Peur de décevoir, peur de manquer une opportunité (FOMO), ou simplement conditionnement social. Mais à chaque fois que vous dites "oui" à quelque chose de non essentiel, vous dites "non" à ce qui compte vraiment pour vous : votre repos, vos projets, votre famille.</p>

      <h2>Le "Non" gracieux</h2>
      <p>Dire non ne fait pas de vous une personne méchante. C'est un acte de respect envers votre propre temps. Voici quelques formules magiques :</p>
      
      <ul>
        <li>"Merci d'avoir pensé à moi, mais je ne peux pas m'engager sur de nouveaux projets actuellement."</li>
        <li>"J'aimerais beaucoup aider, mais mon emploi du temps ne me le permet pas si je veux maintenir la qualité de mon travail actuel."</li>
        <li>"Non, merci." (Oui, c'est une phrase complète).</li>
      </ul>

      <p>Protégez votre temps comme s'il s'agissait de votre compte en banque. Parce que contrairement à l'argent, le temps dépensé ne se gagne plus jamais.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2069',
    excerpt: 'Apprenez à refuser poliment mais fermement pour protéger votre temps et votre énergie.',
    id: '5',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-01-15').toISOString(),
    slug: 'dire-non',
    tags: ['communication', 'limites'],
    title: 'Dire non : le super-pouvoir des gens efficaces',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>La technologie devait nous libérer du temps. Au lieu de cela, nous passons nos journées à répondre à des emails et copier-coller des données entre Excel et un CRM. Il est temps de reprendre le contrôle.</p>
      
      <h2>Si vous le faites trois fois, automatisez-le</h2>
      <p>C'est la règle d'or. Trier ses factures ? Répondre aux mêmes questions clients ? Poster sur les réseaux sociaux ? Tout cela peut être délégué à des robots.</p>
      
      <h2>La boîte à outils du flemmard tech</h2>
      <p>Pas besoin de savoir coder pour automatiser votre vie :</p>
      <ul>
        <li><strong>Zapier / Make :</strong> La colle d'internet. Connectez vos apps entre elles. "Si je reçois un mail avec 'Facture', enregistre la pièce jointe dans Drive".</li>
        <li><strong>ChatGPT :</strong> Votre assistant personnel pour rédiger, résumer, et brainstormer.</li>
        <li><strong>Calendly :</strong> Fini le ping-pong de emails pour trouver un créneau de réunion.</li>
      </ul>
      
      <p>L'objectif n'est pas de travailler plus vite pour en faire plus. C'est de supprimer les tâches sans valeur ajoutée pour pouvoir aller cueillir des champignons (ou regarder Netflix sans culpabilité).</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
    excerpt: 'Les outils no-code indispensables pour déléguer les tâches répétitives à des robots.',
    id: '6',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-01-18').toISOString(),
    slug: 'automatiser-flauner',
    tags: ['tech', 'automatisation'],
    title: 'Automatiser pour mieux flâner',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>Nous sommes obsédés par la vitesse. Fast food, fast fashion, speed dating. Mais la nature ne se presse jamais, et pourtant tout est accompli. Adopter la "Slow Life" n'est pas une régression, c'est une résistance nécessaire.</p>
      
      <h2>Moins mais mieux</h2>
      <p>Ralentir permet de redonner du sens à nos actions. Manger en savourant, marcher en regardant le paysage, écouter quelqu'un sans penser à sa réponse. C'est dans ces interstices que se trouve la qualité de vie.</p>
      
      <blockquote>"Il y a plus dans la vie que d'augmenter sa vitesse." — Gandhi</blockquote>
      
      <p>Essayez une journée sans montre. Mangez quand vous avez faim, dormez quand vous êtes fatigué. Reconnectez-vous à votre rythme biologique plutôt qu'au rythme frénétique de la société. Vous découvrirez peut-être que vous êtes plus efficace quand vous ne courez pas après le temps.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073',
    excerpt: 'Pourquoi la vitesse n’est pas synonyme d’efficacité. Éloge de la lenteur au quotidien.',
    id: '7',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-01-20').toISOString(),
    slug: 'slow-life',
    tags: ['lifestyle', 'bien-être'],
    title: 'Slow life : ralentir pour aller plus loin',
  },
  {
    author: USERS.MATHIS,
    content: `
      <h2>Le chaos extérieur reflète le chaos intérieur</h2>
      <p>Regardez votre bureau. Si c'est un empilement de dossiers, de tasses de café vides et de post-it oubliés, il est probable que votre esprit ressemble à ça aussi. Notre environnement influence directement notre clarté mentale.</p>
      
      <h2>La politique du bureau zéro</h2>
      <p>À la fin de chaque journée, votre bureau devrait revenir à son état initial : vide. Pas "rangé", vide. Seul votre ordinateur et peut-être une plante devraient survivre.</p>
      
      <p>Cela crée un rituel de clôture de la journée de travail, permettant à votre cerveau de déconnecter. Et le lendemain matin, s'asseoir devant un espace immaculé est une invitation à la création, pas un rappel de toutes les tâches en retard.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&q=80&w=2054',
    excerpt: 'Comment un espace de travail épuré peut clarifier votre esprit et booster votre créativité.',
    id: '8',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-01-22').toISOString(),
    slug: 'bureau-vide',
    tags: ['organisation', 'minimalisme'],
    title: 'Le bureau vide : organisation radicale',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>Quand on vous dit "méditation", vous imaginez un moine zen au sommet d'une montagne. Si vous êtes du genre à taper du pied quand le micro-ondes met plus de 30 secondes, cette image vous angoisse probablement.</p>
      
      <h2>La méditation en mouvement</h2>
      <p>La pleine conscience n'exige pas l'immobilité. Elle exige l'attention. Vous pouvez méditer en :</p>
      <ul>
        <li>Faisant la vaisselle (sentez l'eau chaude, le poids des assiettes).</li>
        <li>Marchant (sentez le contact de vos pieds avec le sol).</li>
        <li>Écoutant de la musique (écoutez vraiment, sans faire autre chose).</li>
      </ul>
      
      <p>L'objectif n'est pas de vider votre esprit (c'est impossible), mais de remarquer quand il s'échappe et de le ramener gentiment à l'instant présent. C'est tout.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1508672019048-805c276e71f2?auto=format&fit=crop&q=80&w=2073',
    excerpt:
      'Pas besoin de rester assis en tailleur pendant une heure. La pleine conscience pour ceux qui bougent tout le temps.',
    id: '9',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-01-24').toISOString(),
    slug: 'meditation-hyperactifs',
    tags: ['santé', 'mental'],
    title: 'Méditation pour les hyperactifs',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>C'est le conseil de productivité le plus simple et le plus puissant jamais inventé (merci David Allen). Si une tâche prend moins de deux minutes à accomplir, faites-la immédiatement.</p>
      
      <h2>Pourquoi ça marche ?</h2>
      <p>Parce que le temps et l'énergie nécessaires pour noter la tâche, la planifier, s'en souvenir et y revenir plus tard sont supérieurs à ceux nécessaires pour la faire tout de suite.</p>
      
      <ul>
        <li>Répondre à ce SMS simple ? Maintenant.</li>
        <li>Ranger cette tasse dans le lave-vaisselle ? Maintenant.</li>
        <li>Envoyer ce document ? Maintenant.</li>
      </ul>
      
      <p>Cela garde votre to-do list propre pour les vrais projets et vous donne un sentiment d'accomplissement immédiat. C'est la victoire facile dont votre cerveau a besoin.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1506784365377-64560b370908?auto=format&fit=crop&q=80&w=2068',
    excerpt:
      'Si ça prend moins de 2 minutes, faites-le tout de suite. La méthode simple pour ne plus se laisser déborder.',
    id: '10',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-01-26').toISOString(),
    slug: 'regle-2-minutes',
    tags: ['productivité', 'organisation'],
    title: 'La règle des 2 minutes',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>Le paradoxe moderne : nous adorons manger, mais cuisiner tous les soirs après le travail est une corvée. La solution ? Cuisiner une fois, manger toute la semaine.</p>
      
      <h2>La stratégie du dimanche</h2>
      <p>Consacrez 2 heures le dimanche à préparer des bases :</p>
      <ul>
        <li>Une grande portion de céréales (riz, quinoa, pâtes).</li>
        <li>Des légumes rôtis au four (patates douces, brocolis, carottes).</li>
        <li>Une source de protéines (poulet, tofu, œufs durs).</li>
        <li>Une super sauce maison.</li>
      </ul>
      
      <p>Le soir venu, il ne vous reste plus qu'à assembler. C'est du Lego culinaire. C'est plus sain, moins cher, et ça libère vos soirées pour des activités plus importantes (comme ne rien faire).</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=2070',
    excerpt: 'Préparez vos repas de la semaine en 2h chrono. Le guide complet pour les flemmards gourmands.',
    id: '11',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-01-28').toISOString(),
    slug: 'batch-cooking',
    tags: ['lifestyle', 'cuisine'],
    title: 'Batch cooking : cuisinez moins, mangez mieux',
  },
  {
    author: USERS.MATHIS,
    content: `
      <h2>"Ils vont finir par découvrir que je suis nul"</h2>
      <p>Cette petite voix dans votre tête ? C'est le syndrome de l'imposteur. Et c'est mentir. Environ 70% des gens le ressentent à un moment donné, surtout les plus compétents.</p>
      
      <p>Le doute n'est pas une preuve d'incompétence, c'est une preuve d'intelligence. Les vrais incompétents ne doutent jamais d'eux-mêmes (effet Dunning-Kruger).</p>
      
      <h2>Comment le faire taire</h2>
      <ol>
        <li>Tenez un "Dossier de Victoires". Gardez les emails de remerciements, notez vos succès. Quand le doute frappe, relisez-le.</li>
        <li>Parlez-en. Vous serez surpris de voir combien de personnes que vous admirez ressentent la même chose.</li>
        <li>Acceptez d'être en apprentissage. Vous n'avez pas besoin d'être parfait, juste d'être présent et d'essayer.</li>
      </ol>
      
      <p>Vous êtes à votre place. Respirez.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070',
    excerpt:
      'Vous avez l’impression de ne pas être à votre place ? Spoiler : tout le monde ressent ça. Voici comment gérer.',
    id: '12',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-01-30').toISOString(),
    slug: 'syndrome-imposteur',
    tags: ['mindset', 'carrière'],
    title: 'Le syndrome de l’imposteur',
  },
];

export { BLOG_POSTS };
export type { BlogPost };
