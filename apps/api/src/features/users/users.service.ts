import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BucketEnum } from '@/common/enums';
import { FILE_SERVICE, FileServiceInterface } from '@/common/services/file.service';
import { hashPassword } from '@/common/utils';
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
      relations: ['role'],
      where: { id: savedUser.id },
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
      relations: ['role'],
      where: { email },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      relations: ['role'],
      where: { id },
    });
  }

  async findByPasswordResetToken(token: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      relations: ['role'],
      where: { password_reset_token: token },
    });
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.usersRepository.preload({
      id,
      ...userData,
    });

    if (!user) {
      throw new NotFoundException(UserErrorMessages.USER_NOT_FOUND);
    }

    return await this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async uploadProfilePicture(userId: string, file: Express.Multer.File): Promise<void> {
    const filename = `${userId}.png`;
    const bucket = BucketEnum.PROFILE_PICTURE;

    try {
      const oldFileExists = await this.fileService.exists(filename, bucket);
      if (oldFileExists) {
        await this.fileService.delete(filename, bucket);
      }

      await this.fileService.upload(file, {
        bucket,
        contentType: 'image/png',
        filename,
        metadata: {
          uploadedAt: new Date().toISOString(),
          userId: userId.toString(),
        },
      });
    } catch (error) {
      this.logger.error(`Error uploading profile picture for user ${userId}: ${error}`);
      throw new BadRequestException(UserErrorMessages.ERROR_UPLOADING_PROFILE_PICTURE);
    }
  }
}
