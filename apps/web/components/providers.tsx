import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: Readonly<ProvidersProps>) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};

export { Providers };
