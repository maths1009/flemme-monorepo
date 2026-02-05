import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Container';
import { RichTextRenderer } from '@/components/RichTextRenderer';

import type { User } from '@/data/users';
import { getFullName } from '@/utils/users';

interface TeamMemberPageProps {
  user: User;
}

export function TeamMemberPage({ user }: TeamMemberPageProps) {
  return (
    <article className="min-h-screen bg-white text-slate-900 pt-32 pb-24">
      <Container size="narrow">
        <header className="mb-12 md:mb-16 text-center flex flex-col items-center">
          <div className="mb-8">
            <Avatar
              alt={getFullName(user)}
              className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-xl"
              src={user.avatar}
            />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-black leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            {getFullName(user)}
          </h1>
          <p className="text-xl font-medium text-slate-500 max-w-2xl mx-auto">{user.role}</p>
          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-brand-yellow" />
        </header>

        <div className="mx-auto">
          <RichTextRenderer content={user.bio} />
        </div>
      </Container>
    </article>
  );
}
