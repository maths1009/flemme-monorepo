import { Providers } from '@/components/providers';
import '@/styles/globals.css';
import { ReactNode } from 'react';

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
