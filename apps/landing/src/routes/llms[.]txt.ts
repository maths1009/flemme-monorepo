import { createFileRoute } from '@tanstack/react-router';
import { HERO_DATA } from '@/data/hero';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const baseUrl = new URL(request.url).origin;

        const content = `# Flemme

> ${HERO_DATA.title} ${HERO_DATA.subtitle}

${HERO_DATA.description}

## Nos Services

Nous gérons tout ce qui vous pèse au quotidien :
- **Courses & Shopping** : Frigo vide ? On s'en occupe.
- **Ménage & Entretien** : Profitez d'un intérieur impeccable sans lever le petit doigt.
- **Promenade de chien** : Votre compagnon sort, vous restez au chaud.
- **Missions Impossibles** : Du linge en retard aux démarches administratives.

## Pourquoi Flemme ?

- **Gain de temps** : Récupérez des heures précieuses chaque semaine.
- **Zéro Culpabilité** : La flemme est une force, nous vous aidons à l'assumer.
- **Confiance** : Des "agents secrets" du quotidien, fiables et efficaces.

## Liens Utiles

- [Documentation Complète pour IA](${baseUrl}/llms-full.txt) : Détails exhaustifs sur notre offre et notre philosophie.
- [Site Web](${baseUrl}) : L'expérience visuelle complète.
`;

        return new Response(content, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        });
      },
    },
  },
});
