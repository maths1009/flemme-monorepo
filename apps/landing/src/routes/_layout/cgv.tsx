import { createFileRoute } from '@tanstack/react-router';
import { CGVPage } from '@/pages/CGV/page';
import { generateMeta } from '@/utils/seo';

export const Route = createFileRoute('/_layout/cgv')({
  component: CGVPage,
  head: () => ({
    meta: generateMeta({
      description: 'Consultez nos conditions générales de vente.',
      title: 'Conditions Générales de Vente | Flemme',
    }),
  }),
});
