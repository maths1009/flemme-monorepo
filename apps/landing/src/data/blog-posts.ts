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
      <p>On ne va pas se mentir : la vie serait incroyable si elle consistait uniquement à manger, dormir et regarder des séries. Malheureusement, la vie d'adulte vient avec son lot de corvées qui nous volent notre énergie vitale.</p>
      
      <p>Bienvenue dans le projet flemme. Notre philosophie ? Si ça vous ennuie, ne le faites pas. Faites-le faire.</p>
      
      <p>Voici le classement des pires tâches du quotidien selon flemme et, surtout, les solutions pour les déléguer sans culpabiliser.</p>
      
      <h3>1. Le repassage, la montagne sans fin</h3>
      <p>C'est la tâche n°1 la plus détestée. À peine la panière est-elle vide qu'elle se remplit à nouveau. C'est le mythe de Sisyphe, mais avec des chemises froissées.</p>
      
      <h3>2. Le grand ménage (vitres et poussière)</h3>
      <p>Frotter, astiquer, passer l'aspirateur... C'est physique, c'est long, et c'est à refaire la semaine suivante.</p>
      
      <h3>3. L'administratif et la paperasse</h3>
      <p>Rien ne tue plus la joie de vivre qu'un formulaire Cerfa ou une facture introuvable. La phobie administrative est réelle.</p>
      
      <h3>4. Les courses au supermarché</h3>
      <p>La foule, le caddie qui roule mal, la queue à la caisse... Une perte de temps colossale.</p>
      
      <h3>5. Monter des meubles en kit</h3>
      <p>Le plan est incompréhensible, il manque toujours une vis, et ça finit souvent en dispute de couple.</p>
      
      <h3>6. Tondre la pelouse</h3>
      <p>C'est bruyant, il fait chaud, et ça revient trop vite.</p>
      
      <h3>7. Vendre ses vieux vêtements</h3>
      <p>Prendre les photos, rédiger l'annonce, répondre aux messages "dispo ?", faire le colis, aller à la poste... Trop d'étapes.</p>
      
      <h3>8. Organiser les vacances</h3>
      <p>Chercher le meilleur vol, comparer 50 hôtels, lire les avis... On a besoin de vacances rien que pour préparer les vacances.</p>
      
      <h3>9. La cuisine du quotidien (Le on mange quoi ce soir ?)</h3>
      <p>La charge mentale de trouver une idée + cuisiner + faire la vaisselle tous les soirs.</p>
      
      <h3>10. Sortir le chien (quand il pleut)</h3>
      <p>On les aime, mais à 6h du matin sous la bruine, l'amour est mis à rude épreuve.</p>
      
      <p>On vient de vous lister 10 solutions, et on parie que vous êtes déjà fatigué rien que d'imaginer devoir créer 10 comptes différents, rentrer 10 fois votre carte bleue et gérer 10 mots de passe oubliés.</p>
      
      <p>C'est là qu'on intervient. Le projet flemme, ce n'est pas juste un blog, c'est une mission. Nous sommes en train de construire l'application flemme.</p>
      
      <p>Imaginez une seule interface pour gérer votre ménage, vos courses et votre administratif. Un seul bouton rouge URGENCE FLEMME pour déléguer ce qui vous pèse, là, tout de suite.</p>
      
      <ul>
        <li>Pas de recherche interminable.</li>
        <li>Pas de comparaison de prix (on le fait pour vous).</li>
        <li>Juste du temps libre gagné.</li>
      </ul>
      
      <p>Envie de ne plus jamais rien faire (par vous-même) ? Inscrivez-vous ici pour tester l'appli flemme en avant-première</p>
      
      <h2>FAQ - Les questions que vous vous posez (pour ne pas avoir à chercher)</h2>
      
      <p><strong>Est-ce que ça coûte cher de déléguer ?</strong> L'objectif de Flemme, c'est de rentabiliser votre temps, pas de vous ruiner. Notre application est conçue pour intégrer automatiquement les aides disponibles. On s'occuppe de la paperasse pour que vous payiez le prix juste, sans effort.</p>
      
      <p><strong>Comment trouver quelqu'un de confiance ?</strong> Justement, ne cherchez pas. C'est le travail de l'appli Flemme. Fini d'éplucher les avis sur internet ou d'interroger les voisins. Nous sélectionnons et vérifions rigoureusement chaque intervenant. Si vous passez par Flemme, c'est que la personne est fiable. Vous commandez, vous ouvrez la porte, vous vous reposez.</p>
      
      <p><strong>Je culpabilise de ne rien faire, c'est normal ?</strong> Chez Flemme, la culpabilité est bannie. Nous considérons que votre énergie doit servir à ce que vous aimez vraiment, pas aux corvées. Utiliser notre projet, ce n'est pas être paresseux, c'est être un gestionnaire intelligent de sa propre vie. Laissez-nous gérer le "chiant", gardez le fun.</p>
      
      <p><strong>Par quoi commencer si j'ai un petit budget ?</strong> Le plus simple ? Inscrivez-vous sur le Projet Flemme. Notre algorithme vous suggérera la tâche à déléguer qui vous apportera le plus de soulagement immédiat en fonction de votre budget. Pas besoin de calculer, l'appli réfléchit pour vous.</p>
    `,
    coverImage: '/team-flemme.webp',
    excerpt:
      "On ne va pas se mentir : la vie serait incroyable si elle consistait uniquement à manger, dormir et regarder des séries. Découvrez le top 10 des corvées qu'on déteste tous.",
    id: '1',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-02-05').toISOString(),
    slug: 'top-10-taches-flemme',
    tags: ['lifestyle', 'conseils'],
    title: 'Top 10 des tâches qu’on a tous la flemme de faire',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>C'était un lundi matin gris. Je regardais ma pile de linge sale, mon évier plein et mon frigo vide. J'ai eu une épiphanie : et si j'arrêtais ?</p>
      
      <p>Pas arrêter de vivre, non. Arrêter de subir.</p>
      
      <p>J'ai décidé de faire une expérience radicale : pendant une semaine complète, interdiction formelle de faire une tâche ménagère ou administrative. Si ce n'est pas du plaisir ou mon vrai travail, je délègue.</p>
      
      <h2>Le choc des 48 premières heures : La culpabilité</h2>
      <p>Le mardi, une professionnelle est venue faire le ménage alors que j'étais sur mon canapé à regarder une série.</p>
      <p><strong>Mon ressenti :</strong> Grosse gêne. J'avais envie de lever les jambes pour la laisser passer l'aspirateur. J'avais presque envie de l'aider.</p>
      <p><strong>La réalité :</strong> Elle s'en fichait. Elle faisait son job, elle avait ses écouteurs, elle était efficace.</p>
      <p><strong>Leçon n°1 :</strong> La culpabilité est une construction sociale. Une fois qu'on accepte de lâcher prise, c'est le bonheur.</p>
      
      <h2>Jour 3 et 4 : La redécouverte du temps libre</h2>
      <p>Mercredi soir, pas de courses, pas de cuisine. Un service de livraison m'a apporté des plats sains (pas juste une pizza grasse). Pas de vaisselle à faire. J'ai réalisé que d'habitude, entre 18h et 21h, je ne faisais que courir.</p>
      <p><strong>Ce que j'ai fait à la place :</strong> J'ai lu un livre en entier. J'ai appelé un pote. J'ai dormi 8h.</p>
      <p><strong>Leçon n°2 :</strong> On n'est pas "toujours fatigué", on est juste encombré par des tâches inutiles.</p>
      
      <h2>Le bilan financier vs mental</h2>
      <p>Samedi, j'ai fait faire ma paperasse et tondre la pelouse. Oui, ça a un coût. Mais quand j'ai regardé mon week-end, il était vide. Vide de contraintes. J'ai calculé mon taux horaire : combien je vaux de l'heure quand je bosse ? Payer quelqu'un moins cher que ce taux pour faire ce que je déteste, c'est mathématiquement rentable.</p>
      
      <h2>Le seul problème de ma semaine (et pourquoi il faut l'appli flemme)</h2>
      <p>C'était génial, MAIS... c'était le chaos logistique. Pour réussir cette semaine, j'ai dû :</p>
      <ol>
        <li>Utiliser une appli pour le ménage.</li>
        <li>Une autre pour la livraison de repas.</li>
        <li>Chercher un bricoleur sur un site de petites annonces.</li>
        <li>Gérer 3 paiements différents et 4 conversations par SMS.</li>
      </ol>
      
      <p>Ironie du sort : j'ai eu la flemme de gérer ma flemme. C'est exactement pour ça qu'on a créé l’application flemme. On ne veut pas que vous passiez votre temps à chercher des prestataires. On veut un bouton magique.</p>
      
      <h2>Conclusion : Je ne reviendrai pas en arrière</h2>
      <p>Cette semaine m'a prouvé que déléguer n'est pas un luxe de riche, c'est une hygiène de vie. Mais pour que ce soit viable sur le long terme, il faut que ce soit simple.</p>
      
      <p>Avec l'appli flemme, nous sommes en train de construire ce hub unique. Une seule interface pour tout déléguer, sans avoir à gérer l'organisation.</p>
      
      <p>On s'occupe de trouver les pros, on s'occupe de la confiance, on s'occupe de tout. Vous, vous profitez juste de votre temps libre.</p>
      
      <h2>FAQ - Les questions que vous vous posez (pour ne pas avoir à chercher)</h2>
      
      <p><strong>Dois-je rester chez moi pour surveiller les intervenants ?</strong> Surtout pas (sauf si vous le voulez). L'intérêt de Flemme, c'est de vous libérer. Nos prestataires sont certifiés pour intervenir en votre absence. Vous pouvez aller au cinéma ou au bureau, et retrouver votre maison impeccable en rentrant. C'est ça, la vraie magie.</p>
      
      <p><strong>Et si le travail est mal fait ? (J'ai la flemme de me plaindre)</strong> On a anticipé. Avec Flemme, vous n'avez pas à gérer les conflits gênants. Si la prestation n'est pas à la hauteur, vous cliquez sur un bouton dans l'appli, et notre service client prend le relais immédiatement pour vous rembourser ou renvoyer quelqu'un. Zéro confrontation pour vous.</p>
      
      <p><strong>C'est long de créer un compte ? (J'ai vraiment la flemme)</strong> On a chronométré : ça prend 45 secondes. On a conçu l'interface pour les gens fatigués. Pas de formulaires interminables. Vous connectez, vous dites ce que vous voulez, vous validez.</p>
      
      <p><strong>L'application est-elle déjà disponible partout ?</strong> Nous sommes en phase de lancement exclusif. Pour garantir une qualité de service parfaite, nous ouvrons les accès petit à petit. Inscrivez-vous maintenant pour être prioritaire sur la liste d'attente.</p>
    `,
    coverImage: '/grosse-flemme.jpg.webp',
    excerpt:
      "J'ai décidé de faire une expérience radicale : pendant une semaine complète, interdiction formelle de faire une tâche ménagère. Voici le bilan.",
    id: '2',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-02-12').toISOString(),
    slug: 'delegue-corvees-7-jours',
    tags: ['expérience', 'lifestyle'],
    title: 'J’ai délégué toutes mes corvées pendant 7 jours',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>Il y a deux types de personnes dans le monde : ceux qui paieraient n'importe quoi pour rester dans leur canapé, et ceux qui ont besoin de financer leurs projets (ou leur prochain voyage).</p>
      
      <p>Si vous faites partie de la deuxième catégorie, bonne nouvelle : la flemme des autres est votre mine d'or.</p>
      
      <p>Avec l’application flemme, nous ne cherchons pas seulement à aider les paresseux. Nous cherchons des héros du quotidien. Voici comment transformer vos compétences (ou juste vos bras) en revenus, sans prise de tête.</p>
      
      <h2>1. Le concept : monétisez ce qui vous semble facile</h2>
      <p>Ce qui est une corvée pour votre voisin est peut-être un jeu d'enfant pour vous.</p>
      <ul>
        <li>Vous adorez les animaux ? Promener un chien, c'est du plaisir payé.</li>
        <li>Vous êtes le roi du montage de meubles suédois ? C'est une compétence rare et recherchée.</li>
        <li>Vous avez un grand véhicule ? Aider à déplacer un canapé rapporte gros.</li>
      </ul>
      
      <p>Le principe de la flemme est simple : on connecte ceux qui ne veulent pas faire avec ceux qui peuvent faire.</p>
      
      <h2>2. Pourquoi passer par l'appli flemme (et pas juste une petite annonce) ?</h2>
      <p>Vous pourriez coller un papier à la boulangerie. Mais soyons honnêtes, c'est long et pas très efficace. Même pour travailler, on sait que vous avez un peu la flemme de gérer la logistique.</p>
      <ul>
        <li><strong>Zéro Prospection :</strong> Vous n'avez pas besoin de chercher les clients. Ils sont déjà là, sur l'appli.</li>
        <li><strong>Paiement Garanti :</strong> Le client paie via l'appli avant la mission. Une fois le job fait, l'argent arrive chez vous.</li>
        <li><strong>Sécurité :</strong> Tout est encadré. Pas de mauvaises surprises.</li>
      </ul>
      
      <h2>3. Les missions qui rapportent le plus sur flemme</h2>
      <p>Pas besoin d'avoir un Bac+5 pour gagner de l'argent. Voici ce que nos utilisateurs demandent le plus :</p>
      <ul>
        <li>Les petits bricolages : Changer une ampoule inaccessible, poser une étagère.</li>
        <li>Le support tech : Configurer une imprimante ou expliquer comment marche Netflix.</li>
        <li>Le grand nettoyage : Vitres, terrasses ou voitures.</li>
        <li>Le sitting : Garder des chats, arroser les plantes pendant les vacances.</li>
      </ul>
      
      <h2>4. Comment devenir un héros flemme ?</h2>
      <p>C'est aussi simple que de commander une pizza.</p>
      <ol>
        <li>Téléchargez l'appli flemme.</li>
        <li>Créez un profil prestataire (ça prend 2 minutes).</li>
        <li>Cochez vos compétences (Bricolage ? Jardinage ? Courses ?).</li>
        <li>Activez vos notifs et attendez que ça sonne.</li>
      </ol>
      
      <p>Ne laissez pas votre énergie se perdre. Vos voisins ont la flemme, et ils ont un budget pour ça. Prenez-le. C'est du gagnant-gagnant.</p>
      
      <h2>FAQ - Devenir prestataire (pour ne pas avoir à chercher)</h2>
      
      <p><strong>Faut-il être un professionnel déclaré pour proposer ses services ?</strong> Pour des petites missions ponctuelles entre particuliers, la législation évolue, mais pour faire ça régulièrement, le statut d'auto-entrepreneur est idéal. C'est gratuit à créer et ça vous permet de facturer légalement via l'appli Flemme.</p>
      
      <p><strong>Combien je peux gagner ?</strong> C'est vous qui fixez vos disponibilités. Sur Flemme, nous suggérons des tarifs justes basés sur la difficulté de la tâche. Certains de nos héros gagnent plusieurs centaines d'euros par mois en complément de salaire.</p>
      
      <p><strong>Et si je casse quelque chose chez le client ?</strong> Pas de panique. L'avantage de passer par l'application flemme, c'est que nous incluons une assurance responsabilité civile pour les prestations effectuées via la plateforme.</p>
      
      <p><strong>Comment je reçois mon argent ?</strong> Directement sur votre compte bancaire. Une fois la mission validée par le client, les fonds sont débloqués. Simple, basique.</p>
    `,
    coverImage: "/j'ai-la-flemme.webp",
    excerpt:
      "Ce qui est une corvée pour votre voisin est peut-être un jeu d'enfant pour vous. Apprenez à monétiser votre temps libre avec Flemme.",
    id: '3',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-02-19').toISOString(),
    slug: 'gagner-argent-aidant-voisins',
    tags: ['revenus', 'communauté'],
    title: 'Comment gagner de l’argent en aidant tes voisins ?',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>On vous a menti toute votre vie. Depuis l'école, on vous répète que "l'avenir appartient à ceux qui se lèvent tôt", que "le travail c'est la santé" et que la paresse est un péché capital.</p>
      
      <p>Résultat ? Vous culpabilisez dès que vous passez un dimanche en pyjama.</p>
      
      <p>Mais si on changeait de lunettes ? Et si la flemme n'était pas un défaut, mais une forme supérieure d'intelligence ? Spoiler : Bill Gates est d'accord avec nous.</p>
      
      <h2>1. La théorie de Bill Gates</h2>
      <p>La citation est célèbre, mais on ne s'en lasse pas. Bill Gates a dit : <em>"Je choisirai toujours une personne paresseuse pour faire un travail difficile... parce qu'elle trouvera un moyen facile de le faire."</em></p>
      
      <p>Le travailleur acharné va foncer tête baissée et transpirer pendant 4 heures. Le flemmard ? Il va réfléchir 10 minutes pour trouver comment plier l'affaire en 30 minutes et retourner sur son canapé.</p>
      
      <h2>2. Le flemmard va à l'essentiel</h2>
      <p>Les gens hyperactifs se noient dans les détails. Le flemmard, lui, applique instinctivement la loi du 80/20 : 20% d'efforts pour 80% de résultats.</p>
      <ul>
        <li>Il ne repasse pas ses draps (à quoi bon).</li>
        <li>Il cuisine en gros pour ne pas cuisiner tous les soirs.</li>
        <li>Il automatise tout ce qui peut l'être.</li>
      </ul>
      
      <h2>3. L'invention naît de la fatigue</h2>
      <p>Regardez autour de vous. La plupart des inventions géniales de l'humanité sont nées parce que quelqu'un avait la flemme.</p>
      <ul>
        <li>La télécommande : Flemme de se lever pour changer de chaîne.</li>
        <li>Le lave-vaisselle : Flemme de frotter les assiettes.</li>
        <li>L'ascenseur : Flemme de monter les escaliers.</li>
      </ul>
      
      <h2>4. Déléguer, c'est agir comme un PDG</h2>
      <p>Un PDG ne nettoie pas les bureaux de son entreprise. Quand vous utilisez l’application flemme pour déléguer votre ménage ou votre paperasse, vous agissez comme le PDG de votre propre vie. Vous externalisez les tâches à faible valeur ajoutée pour vous concentrer sur votre cœur de métier.</p>
      
      <p>La prochaine fois qu'on vous traite de fainéant, répondez simplement que vous êtes en "mode économie d'énergie stratégique".</p>
      
      <h2>FAQ - La Flemme stratégique (pour ne pas avoir à chercher)</h2>
      
      <p><strong>Est-ce que je vais devenir "mou" si je délègue tout ?</strong> Au contraire. La charge mentale est ce qui épuise le plus votre cerveau. En déléguant, vous libérez de la bande passante mentale pour des projets qui vous tiennent vraiment à cœur.</p>
      
      <p><strong>Les gens vont-ils me juger si j'utilise l'appli pour tout ?</strong> Il y aura toujours des jaloux qui aiment souffrir. Pendant qu'ils astiquent leurs vitres, vous serez en terrasse au soleil. La meilleure réponse au jugement, c'est votre sourire reposé.</p>
      
      <p><strong>Est-ce vraiment intelligent de payer pour ça ?</strong> Calculez votre taux horaire. Si une heure de ménage coûte moins cher que ce que vaut votre temps, alors payer est la décision la plus intelligente que vous puissiez prendre.</p>
    `,
    coverImage: '/flemme.webp',
    excerpt:
      'Et si la flemme n’était pas un défaut, mais une forme supérieure d’intelligence ? Découvrez la théorie de Bill Gates.',
    id: '4',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-02-26').toISOString(),
    slug: 'flemmard-strategie-intelligente',
    tags: ['mindset', 'philosophie'],
    title: 'Être flemmard, c’est une stratégie intelligente',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>Vous avez une tâche à faire. Vous savez que vous devez la faire. Et pourtant... vous êtes là, à scroller sur votre téléphone.</p>
      
      <p>Pourquoi ? La science a une explication : votre flemme n'est pas un défaut de caractère, c'est une bataille chimique dans votre cerveau.</p>
      
      <h2>1. Le combat du singe et du capitaine</h2>
      <p>Votre cerveau a deux pilotes :</p>
      <ol>
        <li><strong>Le cortex préfrontal (le capitaine) :</strong> Il est rationnel, il pense au long terme.</li>
        <li><strong>Le système limbique (le singe) :</strong> Il veut du plaisir immédiat et déteste l'effort.</li>
      </ol>
      <p>Quand vous devez faire une corvée, le singe crie souvent plus fort que le capitaine. C'est biologique.</p>
      
      <h2>2. La peur déguisée en flemme</h2>
      <p>Souvent, on ne procrastine pas parce qu'on est paresseux, mais parce qu'on est anxieux. Une tâche complexe nous fait peur. Pour éviter cette émotion négative, le cerveau "bug" et refuse de commencer.</p>
      
      <h2>3. La notion de friction</h2>
      <p>Plus une tâche demande d'étapes pour démarrer, moins vous avez de chances de la faire. Sortir l'aspirateur + brancher + passer = Haute friction. Appuyer sur un bouton sur son téléphone = Basse friction.</p>
      
      <h2>Comment l'appli flemme soigne votre cerveau ?</h2>
      <p>L'appli flemme est conçue pour contourner vos blocages psychologiques :</p>
      <ul>
        <li><strong>Récompense immédiate :</strong> Vous déléguez, vous vous sentez soulagé instantanément.</li>
        <li><strong>Réduction de la friction :</strong> On a supprimé toutes les étapes chiantes. Il ne reste que le clic.</li>
        <li><strong>Sécurité émotionnelle :</strong> Un pro s'en occupe, plus de peur de mal faire.</li>
      </ul>
      
      <h2>FAQ - La psychanalyse de votre canapé (pour ne pas avoir à chercher)</h2>
      <p><strong>Est-ce que la procrastination est une maladie ?</strong> Non, c'est un mécanisme de défense naturel. Avec Flemme, vous ne luttez pas contre votre nature, vous trouvez une stratégie pour vivre avec.</p>
      <p><strong>Pourquoi je suis plus fatigué à l'idée de faire le ménage qu'après 2h de sport ?</strong> C'est la fatigue décisionnelle. Devoir planifier coûte plus d'énergie mentale que l'action physique elle-même.</p>
      <p><strong>Comment arrêter de culpabiliser ?</strong> En utilisant flemme, vous réduisez l'écart entre ce que vous devez faire et ce qui est fait. Plus de tâches en retard = plus de raison de culpabiliser.</p>
    `,
    coverImage: "/t'as-la-flemme.webp",
    excerpt:
      'Pourquoi procrastine-t-on autant ? Découvrez le combat entre le singe et le capitaine dans votre cerveau.',
    id: '5',
    layout: 'modern-clean',
    publishedAt: dayjs('2026-03-05').toISOString(),
    slug: 'psychologie-flemme-procrastination',
    tags: ['psychologie', 'mental'],
    title: 'La psychologie de la flemme',
  },
  {
    author: USERS.MATHIS,
    content: `
      <p>Vous avez le doigt sur le bouton "commander". Et là, elle arrive. La Culpabilité.</p>
      <p>Cette petite voix qui vous murmure : "Tu abuses, tu pourrais le faire toi-même..." Stop. Déléguer n'est pas un aveu de faiblesse, c'est une stratégie de survie moderne.</p>
      
      <h2>Excuse N°1 : "Mon temps coûte plus cher que ça"</h2>
      <p>C'est l'argument mathématique. Si vous gagnez 25€ de l'heure, pourquoi passeriez-vous votre samedi à faire une tâche que vous pouvez déléguer pour moins cher ? Vous "rachetez" votre temps.</p>
      
      <h2>Excuse N°2 : "Je préserve ma santé mentale (et mon couple)"</h2>
      <p>Combien de disputes à cause du partage des corvées ? Déléguer, c'est externaliser le conflit. Payer un intervenant coûte moins cher qu'une thérapie de couple.</p>
      
      <h2>Excuse N°3 : "Un pro le fera mieux et plus vite que moi"</h2>
      <p>Un bricoleur pro va monter votre meuble en 1h30, et ce sera parfait. Vous, vous allez y passer 6 heures et perdre une vis. C'est l'humilité stratégique.</p>
      
      <h2>Excuse N°4 : "C'est mon coût d'opportunité"</h2>
      <p>Quand vous choisissez de faire du repassage, vous renoncez à jouer avec vos enfants ou à lire un livre. Qu'est-ce que vous sacrifiez pour faire cette corvée ?</p>
      
      <h2>Excuse N°5 : "Parce que je n'ai pas envie"</h2>
      <p>C'est l'excuse ultime. L'argument de l’application flemme. Vous n'avez pas à justifier votre besoin de repos. La vie est trop courte pour frotter des joints de carrelage.</p>
      
      <h2>FAQ - Anti-culpabilité (pour ne pas avoir à chercher)</h2>
      <p><strong>Que vont penser les gens ?</strong> S'ils vous jugent, c'est qu'ils sont jaloux de votre temps libre. Les vrais amis seront contents de vous voir plus détendu.</p>
      <p><strong>N'est-ce pas un caprice de riche ?</strong> Non. C'est un choix de budget. Certains mettent 100€ dans un resto, d'autres préfèrent payer pour récupérer 4 samedis matins de tranquillité.</p>
      <p><strong>Si je délègue tout, qu'est-ce qu'il me reste à faire ?</strong> Absolument tout ce qui vous rend heureux. C'est ça le but.</p>
    `,
    coverImage: '/flemme-1068x601.webp',
    excerpt: 'Déléguer sans regret grâce à nos 5 arguments imparables. Reprenez le contrôle de votre temps.',
    id: '6',
    layout: 'visual-immersive',
    publishedAt: dayjs('2026-03-12').toISOString(),
    slug: 'top-5-excuses-deleguer',
    tags: ['lifestyle', 'bien-être'],
    title: 'Top 5 des excuses pour déléguer',
  },
].filter((post): post is BlogPost => dayjs(post.publishedAt).isBefore(dayjs()));

export { BLOG_POSTS };
export type { BlogPost };
