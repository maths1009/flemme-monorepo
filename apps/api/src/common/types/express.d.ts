import { RoleEnum } from '@/features/roles/enum/role.enum';
import { User as UserEntity } from '@/features/users/entities/user.entity';

declare global {
  namespace Express {
    interface User extends Omit<UserEntity, 'password'> {
      sessionId: number;
      role: RoleEnum;
    }
  }
}

export {};
