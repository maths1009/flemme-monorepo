import {
  FILE_SERVICE,
  FileServiceInterface,
} from '@/common/services/file.service';
import { hashPassword } from '@/common/utils';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
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
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      throw new ConflictException(UserErrorMessages.USER_ALREADY_EXISTS);
    }

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

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    const user = (await this.usersRepository.findOne({
      where: { id },
    }))!;
    return user;
  }

  async uploadProfilePicture(
    userId: number,
    file: Express.Multer.File,
  ): Promise<void> {
    const filename = `${userId}.png`;
    const bucket = 'profile-picture';

    try {
      const oldFileExists = await this.fileService.exists(filename, bucket);
      if (oldFileExists) {
        await this.fileService.delete(filename, bucket);
      }

      await this.fileService.upload(file, {
        bucket,
        filename,
        contentType: 'image/png',
        metadata: {
          userId: userId.toString(),
          uploadedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      this.logger.error(
        `Error uploading profile picture for user ${userId}: ${error}`,
      );
      throw new BadRequestException(
        UserErrorMessages.ERROR_UPLOADING_PROFILE_PICTURE,
      );
    }
  }
}
