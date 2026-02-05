import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/pages/Contact/page';

export const Route = createFileRoute('/_layout/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      {
        title: 'Contact - Flemme',
      },
      {
        content:
          'Besoin de nous parler ? Une question, un bug ou juste envie de nous dire à quel point tu es flemmi ? On est là.',
        name: 'description',
      },
    ],
  }),
});
