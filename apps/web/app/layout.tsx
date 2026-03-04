import { Providers } from '@/components/providers';
import { MobileOnlyGuard } from '@/components/common/MobileOnlyGuard';
import '@/styles/globals.css';
import { ReactNode } from 'react';

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <MobileOnlyGuard>{children}</MobileOnlyGuard>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
