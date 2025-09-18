import Image from 'next/image';

function CircularButton() {
  return (
    <>
      <div
        style={{
          borderRadius: '1000px',
          background: '#4E77CF',
          display: 'flex',
          width: '81px',
          height: '81px',
          padding: '22px 18px 22px 17px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: '0',
        }}
      >
        <button>
          <Image
            src="/images/auth/arrowCTA.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </button>
      </div>
    </>
  );
}

export { CircularButton };
