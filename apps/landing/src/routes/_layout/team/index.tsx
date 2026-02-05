import { createFileRoute } from '@tanstack/react-router';
import { USERS } from '@/data/users';
import { TeamPage } from '@/pages/Team/page';
import { generateMeta } from '@/utils/seo';

// biome-ignore assist/source/useSortedKeys: Order of properties doesn't matter
export const Route = createFileRoute('/_layout/team/')({
  loader: () => {
    return { users: USERS };
  },
  component: TeamRouteComponent,
  head: () => ({
    meta: generateMeta({
      description:
        "Découvrez les visages derrière Flemme, la plateforme qui révolutionne l'entraide de proximité. Une équipe passionnée au service de votre quotidien.",
      title: 'Notre équipe | Flemme',
    }),
  }),
});

function TeamRouteComponent() {
  const { users } = Route.useLoaderData();
  return <TeamPage users={users} />;
}
