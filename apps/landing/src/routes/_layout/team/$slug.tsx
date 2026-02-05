import { createFileRoute, redirect } from '@tanstack/react-router';
import { USERS } from '@/data/users';
import { TeamMemberPage } from '@/pages/TeamMember/page';
import { generateMeta } from '@/utils/seo';
import { getFullName, getSlug } from '@/utils/users';

// biome-ignore assist/source/useSortedKeys: Order of properties doesn't matter
export const Route = createFileRoute('/_layout/team/$slug')({
  loader: ({ params }) => {
    const user = USERS.find(u => getSlug(u) === params.slug);
    if (!user) throw redirect({ to: '/404' });
    return { user };
  },
  component: TeamMemberRouteComponent,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { user } = loaderData;
    return {
      meta: generateMeta({
        description: user.role,
        image: user.avatar,
        title: `${getFullName(user)} | Équipe Flemme`,
      }),
    };
  },
});

function TeamMemberRouteComponent() {
  const { user } = Route.useLoaderData();
  return <TeamMemberPage user={user} />;
}
