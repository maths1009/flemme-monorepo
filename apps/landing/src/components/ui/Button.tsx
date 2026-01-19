import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background border-2 border-black shadow-[2px_4px_0px_#000] hover:shadow-[3px_5px_0px_#000] hover:-translate-y-[1px] active:shadow-[1px_2px_0px_#000] active:translate-y-[1px]',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-6 py-3',
        icon: 'h-10 w-10',
        lg: 'h-11 px-8',
        sm: 'h-9 px-3',
      },
      variant: {
        cta: 'bg-brand-yellow text-black px-8 py-4 text-base hover:bg-brand-yellow/90',
        default: 'bg-white text-black hover:bg-slate-50',
        ghost:
          'border-none shadow-none hover:bg-accent hover:text-accent-foreground hover:shadow-none hover:translate-y-0 active:translate-y-0 active:shadow-none',
        primary: 'bg-brand-yellow text-black hover:bg-brand-yellow/90',
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={buttonVariants({ className, size, variant })} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
