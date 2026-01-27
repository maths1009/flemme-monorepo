import { createFileRoute } from '@tanstack/react-router';
import { FAQ_DATA } from '@/data/faq';
import { HERO_DATA } from '@/data/hero';
import { SERVICES_DATA } from '@/data/services';
import { TESTIMONIALS_DATA } from '@/data/testimonials';

export const Route = createFileRoute('/llms-full.txt')({
  server: {
    handlers: {
      GET: () => {
        const servicesContent = SERVICES_DATA.map(
          service => `### ${service.title}
${service.description}
*${service.label}*`,
        ).join('\n\n');

        const testimonialsContent = TESTIMONIALS_DATA.map(t => `- **${t.name}** : "${t.review}"`).join('\n');

        const faqContent = FAQ_DATA.map(
          q => `**${q.question}**
${q.answer}`,
        ).join('\n\n');

        const content = `# Flemme - Service de délégation de tâches

## ${HERO_DATA.title}

> ${HERO_DATA.subtitle}

${HERO_DATA.description}

---

## Nos Services

${servicesContent}

---

## Témoignages

${testimonialsContent}

---

## FAQ (Foire Aux Questions)

${faqContent}

---
*Généré automatiquement pour l'indexation IA par Flemme.*
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
