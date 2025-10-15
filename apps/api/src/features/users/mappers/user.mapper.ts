import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export const userToDto = (user: User): UserDto => ({
  email: user.email,
  email_verified: user.email_verified,
  firstname: user.firstname,
  id: user.id,
  lastname: user.lastname,
  notif_enabled: user.notif_enabled,
  role: user.role.name,
  score: user.score,
  username: user.username,
});
