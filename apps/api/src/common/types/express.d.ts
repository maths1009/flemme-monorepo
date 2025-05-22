import { User as IUser } from '@/features/users/entities/user.entity';

declare global {
  namespace Express {
    interface User extends Omit<IUser, 'password'> {
      sessionId: number;
    }
  }
}

export {};
