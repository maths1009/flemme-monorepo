import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/pages/Home/page';
import { getLandingSchema } from '@/utils/schema';

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
  head: () => {
    const schemas = getLandingSchema();

    return {
      scripts: schemas.map(schema => ({
        children: JSON.stringify(schema),
        type: 'application/ld+json',
      })),
    };
  },
});
