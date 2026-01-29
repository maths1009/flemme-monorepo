import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const tagVariants = cva('rounded-full font-bold uppercase tracking-wider', {
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
  variants: {
    intent: {
      muted: 'bg-slate-100 text-slate-700',
      outline: 'border border-slate-200 text-slate-600',
      primary: 'bg-brand-yellow text-black',
      secondary: 'bg-slate-200 text-slate-800',
    },
    size: {
      lg: 'px-4 py-1.5 text-sm',
      md: 'px-3 py-1 text-xs',
      sm: 'px-2 py-0.5 text-[10px]',
    },
  },
});

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
