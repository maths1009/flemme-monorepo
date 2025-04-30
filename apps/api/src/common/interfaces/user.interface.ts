import { User } from '@/features/users/entities/user.entity';

export type SafeUser = Omit<User, 'password' | 'role_id'>;
