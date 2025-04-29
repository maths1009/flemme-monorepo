import { Providers } from '@/components';
import { ReactNode } from 'react';

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html suppressHydrationWarning>
    <body suppressHydrationWarning>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
