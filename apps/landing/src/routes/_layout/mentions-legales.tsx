import { createFileRoute } from '@tanstack/react-router';
import { MentionsLegalesPage } from '@/pages/MentionsLegales/page';
import { generateMeta } from '@/utils/seo';

export const Route = createFileRoute('/_layout/mentions-legales')({
  component: MentionsLegalesPage,
  head: () => ({
    meta: generateMeta({
      description: "Mentions légales de l'application Flemme.",
      title: 'Mentions Légales | Flemme',
    }),
  }),
});
