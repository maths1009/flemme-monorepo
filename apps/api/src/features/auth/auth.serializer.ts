import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@/features/users/entities/user.entity';
import { UsersService } from '@/features/users/users.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error | null, user?: any) => void): void {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: (err: Error | null, user?: any) => void): Promise<void> {
    try {
      const user = await this.usersService.findOne(userId);
      done(null, user);
    } catch (err) {
      done(err as Error);
    }
  }
}
