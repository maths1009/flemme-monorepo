import type { ReactNode } from 'react';
import { Providers } from '@/components';
import '@/styles/globals.css';
import { ReactNode } from 'react';

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="fr" suppressHydrationWarning>
    <body suppressHydrationWarning>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
