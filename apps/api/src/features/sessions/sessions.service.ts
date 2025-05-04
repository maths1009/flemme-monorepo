import { JwtService } from '@/common/services';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
   * @returns Created session
   */
  async create(
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

    return await this.sessionsRepository.save(session);
  }

  /**
   * Find all sessions in the system
   * @param limit Optional limit for pagination
   * @param offset Optional offset for pagination
   * @returns Array of all sessions
   */
  async findAll(limit = 100, offset = 0): Promise<Session[]> {
    return this.sessionsRepository.find({
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Find all sessions for a user
   * @param userId User ID
   * @returns Array of sessions
   */
  async findByUserId(userId: number): Promise<Session[]> {
    return this.sessionsRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Find a session by its ID
   * @param id Session ID
   * @returns Session or null if not found
   */
  async findById(id: number): Promise<Session | null> {
    return this.sessionsRepository.findOne({
      where: { id },
    });
  }

  /**
   * Validate if a session is active and belongs to the specified user
   * @param id Session ID
   * @param userId User ID
   * @returns Session if valid
   * @throws UnauthorizedException if expired or not found
   */
  async validate(id: number, userId: number): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id, user_id: userId },
    });

    if (!session) {
      throw new UnauthorizedException('Session invalide ou non trouvée');
    }

    if (new Date() > session.expired_at) {
      await this.deleteById(id);
      throw new UnauthorizedException('Session expirée');
    }

    return session;
  }

  /**
   * Delete a single session by ID
   * @param id Session ID
   * @throws NotFoundException if session not found
   */
  async deleteById(id: number): Promise<void> {
    const result = await this.sessionsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Session non trouvée');
    }
  }

  /**
   * Delete a session for a specific user
   * @param id Session ID
   * @param userId User ID
   * @throws NotFoundException if session not found
   */
  async deleteByIdAndUserId(id: number, userId: number): Promise<void> {
    const result = await this.sessionsRepository.delete({
      id,
      user_id: userId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Session non trouvée');
    }
  }

  /**
   * Delete all sessions for a user
   * @param userId User ID
   */
  async deleteByUserId(userId: number): Promise<void> {
    await this.sessionsRepository.delete({ user_id: userId });
  }
}
