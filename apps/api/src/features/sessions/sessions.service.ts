import { JwtService } from '@/common/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceType, OsType, Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
    private jwtService: JwtService,
  ) {}

  /**
   * Create a new session for a user
   * @param userId User ID
   * @param deviceType Device type (default to OTHER)
   * @param osType OS type (default to OTHER)
   * @returns Created session with token
   */
  async createSession(
    userId: number,
    deviceType: DeviceType = DeviceType.OTHER,
    osType: OsType = OsType.OTHER,
  ): Promise<Session> {
    const session = this.sessionsRepository.create({
      user_id: userId,
      device_type: deviceType,
      os_type: osType,
      expired_at: this.jwtService.getTokenExpirationDate(),
    });

    const savedSession = await this.sessionsRepository.save(session);

    return savedSession;
  }

  /**
   * Validate a session by ID and check if it's expired
   * @param sessionId Session ID
   * @param userId User ID to verify session ownership
   * @returns Session if valid, throws UnauthorizedException if expired or not found
   */
  async validateSession(sessionId: number, userId: number): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id: sessionId, user_id: userId },
    });

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    if (new Date() > session.expired_at) {
      await this.sessionsRepository.delete(sessionId);
      throw new UnauthorizedException('Session expired');
    }

    return session;
  }

  /**
   * Invalidate a session by ID
   * @param sessionId Session ID
   * @param userId User ID to verify session ownership
   */
  async invalidateSession(sessionId: number, userId: number): Promise<void> {
    const result = await this.sessionsRepository.delete({
      id: sessionId,
      user_id: userId,
    });

    if (result.affected === 0) {
      throw new UnauthorizedException('Session not found');
    }
  }

  /**
   * Invalidate all sessions for a user
   * @param userId User ID
   */
  async invalidateAllSessions(userId: number): Promise<void> {
    await this.sessionsRepository.delete({ user_id: userId });
  }
}
