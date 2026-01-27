import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const containerVariants = cva('container mx-auto px-4', {
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'max-w-7xl',
      full: 'max-w-full',
      narrow: 'max-w-3xl',
      wide: 'max-w-[1920px]',
    },
  },
});

interface ContainerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export function Container({ children, className, size, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ className, size }))} {...props}>
      {children}
    </div>
  );
}
