import { hashPassword } from '@/common/utils';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserErrorMessages } from './errors/user-error-message';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser)
      throw new ConflictException(UserErrorMessages.USER_ALREADY_EXISTS);

    userData.password = await hashPassword(userData.password!);

    const user = this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(user);

    const userWithRole = await this.usersRepository.findOne({
      where: { id: savedUser.id },
      relations: ['role'],
    });

    if (!userWithRole) {
      this.logger.error('User not found after creation', {
        userId: savedUser.id,
      });
      throw new Error('User not found after creation');
    }

    return userWithRole;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }
}
