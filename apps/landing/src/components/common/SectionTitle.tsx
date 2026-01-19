import { cx } from 'class-variance-authority';
import * as React from 'react';

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ className, label, title, description, align = 'center', ...props }, ref) => {
    return (
      <div
        className={cx(
          'flex flex-col gap-4 mb-12',
          align === 'center' ? 'text-center items-center' : 'text-left items-start',
          className,
        )}
        ref={ref}
        {...props}
      >
        {label && (
          <span className="text-xs uppercase tracking-widest text-[#5a4e3b] font-medium font-sans">{label}</span>
        )}
        <h2 className="text-4xl md:text-5xl font-black text-black leading-[1.1] tracking-tight">{title}</h2>
        {description && <p className="text-base md:text-lg text-black/80 max-w-lg leading-relaxed">{description}</p>}
      </div>
    );
  },
);

SectionTitle.displayName = 'SectionTitle';

export { SectionTitle };
