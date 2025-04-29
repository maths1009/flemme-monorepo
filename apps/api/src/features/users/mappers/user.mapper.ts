import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      notif_enabled: user.notif_enabled,
      score: user.score,
      email_verified: user.email_verified,
      role: user.role.name,
    };
  }
}
