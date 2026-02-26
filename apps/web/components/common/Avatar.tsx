import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  fallback?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-24 h-24 text-2xl',
};

export function Avatar({
  src,
  fallback,
  alt,
  size = 'md',
  className,
}: AvatarProps) {
  const [error, setError] = React.useState(false);

  const showImage = src && !error;
  
  const initials = fallback?.slice(0, 2).toUpperCase() || '?';

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200',
        sizeClasses[size],
        className
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="font-semibold text-gray-500">{initials}</span>
      )}
    </div>
  );
}
