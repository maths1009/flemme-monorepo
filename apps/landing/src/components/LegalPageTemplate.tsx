import type { ReactNode } from 'react';
import { Container } from '@/components/Container';
import { formatDate } from '@/utils/date';

interface LegalPageTemplateProps {
  title: string;
  lastUpdated?: string | Date;
  children: ReactNode;
}

export function LegalPageTemplate({ title, lastUpdated, children }: LegalPageTemplateProps) {
  return (
    <article className="min-h-screen bg-white text-slate-900 pt-32 pb-24">
      <Container size="narrow">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="mb-6 font-serif text-4xl font-black leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-slate-500 text-sm md:text-base">Dernière mise à jour : {formatDate(lastUpdated)}</p>
          )}
          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-brand-yellow" />
        </header>

        <div className="mx-auto">{children}</div>
      </Container>
    </article>
  );
}
