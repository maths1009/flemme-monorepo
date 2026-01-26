import { createRootRoute, HeadContent, Navigate, Outlet, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import '../index.css';
import { Toaster } from '@/components/Toaster';

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
      <GoogleAnalytics />
      <Outlet />
      <Toaster />
    </RootDocument>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
      {
        title: 'Flemme',
      },
    ],
  }),
  notFoundComponent: () => <Navigate replace to="/404" />,
});
