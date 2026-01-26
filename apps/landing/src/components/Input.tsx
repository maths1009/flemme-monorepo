import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'flex h-12 w-full rounded-lg border-2 border-black bg-white px-4 py-2 text-base text-black shadow-[2px_4px_0px_#000] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/60 focus-visible:outline-none focus-visible:border-brand-yellow disabled:cursor-not-allowed disabled:opacity-50',
  {
    defaultVariants: {
      error: false,
    },
    variants: {
      error: {
        false: '',
        true: 'border-red-500 focus-visible:border-red-500',
      },
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
  return <input className={inputVariants({ className, error })} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
