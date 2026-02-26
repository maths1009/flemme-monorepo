import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {}

interface PasswordInputProps extends Omit<InputProps, 'type'> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{ borderRadius: '64px' }}
        className={cn(
          'flex w-full border border-[#F5F5DC] bg-[#FEFEFB] px-4 py-4 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          style={{ borderRadius: '64px' }}
          className={cn(
            'flex w-full border border-[#F5F5DC] bg-[#FEFEFB] px-4 py-4 pr-12 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { Input, PasswordInput };
