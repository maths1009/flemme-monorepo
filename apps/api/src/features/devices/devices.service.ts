import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
    private readonly configService: ConfigService,
  ) {}

  async create(sessionId: string, userId: string, userAgent?: string, ip?: string): Promise<Device> {
    const device = this.devicesRepository.create({
      created_at: dayjs().toISOString(),
      expired_at: dayjs().add(this.configService.get('SESSION_EXPIRATION_TIME')!, 'millisecond').toISOString(),
      id: sessionId,
      ip,
      last_used_at: dayjs().toISOString(),
      user_agent: userAgent,
      user_id: userId,
    });

    return this.devicesRepository.save(device);
  }

  async findOne(id: string): Promise<Device | null> {
    return await this.devicesRepository.findOne({
      where: { id },
    });
  }

  async findAllByUser(userId: string): Promise<Device[]> {
    return await this.devicesRepository.find({
      where: { user_id: userId },
    });
  }

  async delete(id: string): Promise<void> {
    await this.devicesRepository.delete(id);
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await this.devicesRepository.delete({ user_id: userId });
  }
}
