import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const textAreaVariants = cva('group flex w-full gap-2 px-3 py-3 transition-all md:px-4', {
  defaultVariants: {
    error: false,
    variant: 'default',
  },
  variants: {
    error: {
      false: '',
      true: 'border-red-500',
    },
    variant: {
      default: 'rounded-lg border-2 border-black bg-white shadow-[2px_4px_0px_#000] focus-within:ring-offset-2',
    },
  },
});

type TextAreaRootProps = ComponentProps<'div'> & VariantProps<typeof textAreaVariants>;

function TextArea({ className, variant, error, ...props }: TextAreaRootProps) {
  return <div className={cn(textAreaVariants({ error, variant }), className)} {...props} />;
}

type TextAreaInputProps = ComponentProps<'textarea'>;

function TextAreaInput({ className, ...props }: TextAreaInputProps) {
  return (
    <textarea
      className={cn(
        'flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] resize-none',
        className,
      )}
      {...props}
    />
  );
}

TextArea.Input = TextAreaInput;

export { TextArea };
