import type { ReactNode } from 'react';
import { Providers } from '@/components';

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
