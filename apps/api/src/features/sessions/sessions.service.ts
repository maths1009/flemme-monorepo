import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
    private readonly configService: ConfigService,
  ) {}

  async create(userId: string, userAgent?: string, ip?: string): Promise<Session> {
    const session = this.sessionsRepository.create({
      user_id: userId,
      last_used_at: dayjs().toISOString(),
      expired_at: dayjs()
        .add(this.configService.get('SESSION_EXPIRATION_TIME')!, 'millisecond')
        .toISOString(),
      created_at: dayjs().toISOString(),
      user_agent: userAgent,
      ip,
    });

    return this.sessionsRepository.save(session);
  }

  async findOne(id: string): Promise<Session | null> {
    return await this.sessionsRepository.findOne({
      where: { id },
    });
  }

  async updateLastUsed(sessionId: string): Promise<void> {
    await this.sessionsRepository.update(
      { id: sessionId },
      { last_used_at: dayjs().toISOString() },
    );
  }

  async delete(id: string): Promise<void> {
    await this.sessionsRepository.delete(id);
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await this.sessionsRepository.delete({ user_id: userId });
  }
}
