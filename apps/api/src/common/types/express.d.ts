import { User as UserEntity } from '@/features/users/entities/user.entity';

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
