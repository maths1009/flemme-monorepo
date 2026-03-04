'use client';

import { useEffect, useState, ReactNode } from 'react';
import { DesktopNotAvailable } from './DesktopNotAvailable';

type MobileOnlyGuardProps = {
  children: ReactNode;
};

export const MobileOnlyGuard = ({ children }: MobileOnlyGuardProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (!isMobile) {
    return <DesktopNotAvailable />;
  }

  return <>{children}</>;
};
