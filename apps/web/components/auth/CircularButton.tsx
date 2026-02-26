import Image from 'next/image';

interface CircularButtonProps {
  onClick?: () => void;
}

function CircularButton({ onClick }: CircularButtonProps) {
  return (
    <button
      aria-label="Submit"
      onClick={onClick}
      style={{
        alignItems: 'center',
        background: '#4E77CF',
        border: 'none',
        borderRadius: '1000px',
        cursor: 'pointer',
        display: 'flex',
        flexShrink: '0',
        height: '81px',
        justifyContent: 'center',
        padding: '22px 18px 22px 17px',
        width: '81px',
      }}
      type="button"
    >
      <Image alt="arrow" height={100} src="/images/auth/arrowCTA.svg" width={100} />
    </button>
  );
}

export { CircularButton };
