interface JwtPayload {
  sessionId: string;
}

interface ResetPasswordJwtPayload {
  email: string;
  type: 'password_reset';
}
