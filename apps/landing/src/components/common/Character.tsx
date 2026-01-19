import { cx } from 'class-variance-authority';
import * as React from 'react';

interface CharacterProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  variant?: 'green' | 'blue' | 'pink' | 'purple';
}

const Character = React.forwardRef<HTMLDivElement, CharacterProps>(
  ({ className, src, alt, variant = 'green', ...props }, ref) => {
    const bgColors = {
      blue: 'bg-[#405ef6]',
      green: 'bg-[#13da2a]',
      pink: 'bg-[#ff6fbd]',
      purple: 'bg-[#7d4fea]',
    };

    return (
      <div className={cx('relative w-[250px] h-[300px] md:w-[300px] md:h-[350px]', className)} ref={ref} {...props}>
        {/* Background Pills shape */}
        <div
          className={cx(
            'absolute top-0 left-1/2 -translate-x-1/2 w-[220px] md:w-[270px] h-full rounded-t-full',
            bgColors[variant],
          )}
        />
        {/* Character Image */}
        <img alt={alt} className="relative z-10 w-full h-full object-contain" loading="lazy" src={src} />
      </div>
    );
  },
);
Character.displayName = 'Character';

export { Character };
