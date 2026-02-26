import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { AuthProvider } from '@/context/AuthContext';
import type { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: Readonly<ProvidersProps>) => {
  return (
    <AuthProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </AuthProvider>
  );
};

export { Providers };
