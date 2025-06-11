import { UserDto } from '@/features/users/dto/user.dto';

declare global {
  namespace Express {
    interface User extends UserDto {
      sessionId: number;
    }
  }
}

export {};
