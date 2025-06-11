import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { UAParser } from 'ua-parser-js';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
    private readonly configService: ConfigService,
  ) {}

  async create(userId: number, userAgent: string): Promise<Session> {
    const { browser, os } = UAParser(userAgent);

    const session = this.sessionsRepository.create({
      user_id: userId,
      last_used_at: dayjs().toISOString(),
      expired_at: dayjs()
        .add(this.configService.get('SESSION_EXPIRATION_TIME')!, 'millisecond')
        .toISOString(),
      created_at: dayjs().toISOString(),
      browser_type: browser.name,
      os_type: os.name,
    });

    return this.sessionsRepository.save(session);
  }

  async findOne(id: number): Promise<Session | null> {
    return this.sessionsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async updateLastUsed(sessionId: number): Promise<void> {
    await this.sessionsRepository.update(
      { id: sessionId },
      { last_used_at: dayjs().toISOString() },
    );
  }

  async delete(id: number): Promise<void> {
    await this.sessionsRepository.delete(id);
  }

  async deleteUserSessions(userId: number): Promise<void> {
    await this.sessionsRepository.delete({ user_id: userId });
  }
}
