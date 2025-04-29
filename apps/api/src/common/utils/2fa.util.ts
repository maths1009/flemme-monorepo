const generateOtpCode = (length: number) => {
  const otp = Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
    '',
  );
  return parseInt(otp, 10);
};

export { generateOtpCode };
