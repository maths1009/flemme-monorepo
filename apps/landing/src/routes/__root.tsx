import { createRootRoute, HeadContent, Navigate, Outlet, Scripts } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';
import type { ReactNode } from 'react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import '../index.css';
import { Toaster } from '@/components/Toaster';
import { generateMeta } from '@/utils/seo';

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <NuqsAdapter>
        <GoogleAnalytics />
        <Outlet />
        <Toaster />
      </NuqsAdapter>
    </RootDocument>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: generateMeta({
      description:
        "Flemme est la méthode ultime pour être productif sans se fatiguer. Apprenez à en faire moins pour gagner plus (de temps, d'argent, de sommeil).",
      title: 'Flemme | La productivité décomplexée',
    }),
  }),
  notFoundComponent: () => <Navigate replace to="/404" />,
});
