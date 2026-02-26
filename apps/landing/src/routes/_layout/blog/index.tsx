import { createFileRoute } from '@tanstack/react-router';
import { BlogPage } from '@/pages/Blog/page';

export const Route = createFileRoute('/_layout/blog/')({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: 'Le Blog de la Flemme | Conseils détente et bien-être' },
      {
        content:
          "Découvrez nos conseils, astuces et philosophie de vie pour ceux qui ont compris que moins, c'est mieux. Apprenez à vous détendre avec style.",
        name: 'description',
      },
      { content: 'Le Blog de la Flemme | Conseils détente et bien-être', property: 'og:title' },
      {
        content:
          "Découvrez nos conseils, astuces et philosophie de vie pour ceux qui ont compris que moins, c'est mieux.",
        property: 'og:description',
      },
      { content: 'website', property: 'og:type' },
    ],
  }),
});
