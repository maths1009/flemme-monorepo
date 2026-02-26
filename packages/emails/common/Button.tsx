import { Button as ReactEmailButton } from '@react-email/components';
import type * as React from 'react';

interface FlemmeButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<FlemmeButtonProps> = ({ href, children, className = '' }) => {
  return (
    <ReactEmailButton
      className={`bg-brand-yellow border-2 border-black shadow-[2px_4px_0px_#000] text-black rounded-lg text-base font-bold py-3 px-8 text-center ${className}`}
      href={href}
    >
      {children}
    </ReactEmailButton>
  );
};
