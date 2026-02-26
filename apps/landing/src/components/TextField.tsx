import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const textFieldVariants = cva('group flex h-11 w-full items-center gap-2 px-3 transition-all md:h-12 md:px-4', {
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

type TextFieldRootProps = ComponentProps<'div'> & VariantProps<typeof textFieldVariants>;

function TextField({ className, variant, error, ...props }: TextFieldRootProps) {
  return <div className={cn(textFieldVariants({ error, variant }), className)} {...props} />;
}

type TextFieldSlotProps = ComponentProps<'div'>;

function TextFieldSlot({ className, ...props }: TextFieldSlotProps) {
  return <div className={cn('flex items-center justify-center text-slate-400', className)} {...props} />;
}

type TextFieldInputProps = ComponentProps<'input'>;

function TextFieldInput({ className, ...props }: TextFieldInputProps) {
  return (
    <input
      className={cn(
        'flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

TextField.Slot = TextFieldSlot;
TextField.Input = TextFieldInput;

export { TextField };
