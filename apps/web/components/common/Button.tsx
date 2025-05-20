type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'outline-dark' | 'white' | 'underline';
  loop?: boolean;
};

const Button = ({
  children = 'Button',
  onClick,
  className,
  variant = 'default',
  loop = false,
}: ButtonProps) => {
  return (
    <button
      className={`rounded-full p-4 px-8 flex ${
        variant === 'outline'
          ? 'border-2 border-[#FCFCF3] bg-transparent text-[#FCFCF3]'
          : variant === 'outline-dark'
            ? 'border-2 border-black bg-transparent text-[#282924]'
            : variant === 'white'
              ? 'bg-[#FCFCF3] text-[#282924]'
              : variant === 'underline'
                ? 'bg-transparent text-[#282924] underline underline-offset-2'
                : 'bg-[#282924] text-[#FCFCF3]'
      }`}
      onClick={onClick}
    >
      {loop && (
        <img
          src="/images/components/loop-button.svg"
          width={24}
          height={24}
          style={{ marginBottom: '0.2rem' }}
          // fill="white"
          // strokeLinejoin="round"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
