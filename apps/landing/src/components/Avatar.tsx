import { cva, type VariantProps } from 'class-variance-authority';
import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const avatarVariants = cva('rounded-full object-cover', {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: 'h-12 w-12 md:h-14 md:w-14',
      md: 'h-10 w-10 md:h-12 md:w-12',
      sm: 'h-8 w-8',
      xl: 'h-16 w-16 md:h-20 md:w-20',
    },
  },
});

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof avatarVariants> {
  // We can still allow explicit numerical overrides if needed, but variants are preferred
}

export function Avatar({ src, alt, className, size, loading = 'lazy', ...props }: AvatarProps) {
  return <img alt={alt} className={cn(avatarVariants({ className, size }))} loading={loading} src={src} {...props} />;
}
