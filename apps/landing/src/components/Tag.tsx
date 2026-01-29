import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center justify-center font-black uppercase tracking-wider border-2 border-black transition-all hover:shadow-[2px_2px_0px_#000] hover:-translate-y-0.5',
  {
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
    variants: {
      intent: {
        muted: 'bg-white text-black',
        outline: 'bg-transparent text-black',
        primary: 'bg-brand-yellow text-black',
        secondary: 'bg-brand-blue text-white',
      },
      size: {
        lg: 'rounded-md px-4 py-1.5 text-sm',
        md: 'rounded-sm px-2.5 py-0.5 text-[10px]',
        sm: 'rounded-sm px-2 py-0.5 text-[8px]',
      },
    },
  },
);

interface TagProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  children: string;
}

export function Tag({ children, className, intent, size, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ className, intent, size }))} {...props}>
      {children}
    </span>
  );
}
