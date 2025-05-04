import { User } from '@/common/decorators';
import { TokenPayload } from '@/common/interfaces';
import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Session } from './entities/session.entity';
import { SessionsService } from './sessions.service';

@ApiTags('user-sessions')
@Controller('users/:userId/sessions')
export class UserSessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all user's sessions" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved all sessions of the user',
    type: [Session],
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not authorized to access these sessions',
  })
  async getUserSessions(
    @Param('userId', ParseIntPipe) userId: number,
    @User() user: TokenPayload,
  ): Promise<Session[]> {
    if (userId !== user.sub) {
      throw new ForbiddenException('Not authorized to access these sessions');
    }

    return this.sessionsService.findByUserId(userId);
  }

  @Get(':sessionId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific session by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Session found',
    type: Session,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Session not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not authorized to access this session',
  })
  async getSession(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @User() user: TokenPayload,
  ): Promise<Session> {
    if (userId !== user.sub) {
      throw new ForbiddenException('Not authorized to access this session');
    }

    const session = await this.sessionsService.findById(sessionId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.user_id !== userId) {
      throw new ForbiddenException('Not authorized to access this session');
    }

    return session;
  }

  @Delete(':sessionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a specific session' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Session successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not authorized to delete this session',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Session not found',
  })
  async deleteSession(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @User() user: TokenPayload,
  ): Promise<void> {
    if (userId !== user.sub) {
      throw new ForbiddenException('Not authorized to delete this session');
    }

    const session = await this.sessionsService.findById(sessionId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.user_id !== userId) {
      throw new ForbiddenException('Not authorized to delete this session');
    }

    await this.sessionsService.deleteById(sessionId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary:
      "Delete all user's sessions including the current one (complete logout)",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'All sessions successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Not authorized to delete these sessions',
  })
  async deleteAllSessions(
    @Param('userId', ParseIntPipe) userId: number,
    @User() user: TokenPayload,
  ): Promise<void> {
    // Verify user has permission to delete their sessions
    if (userId !== user.sub) {
      throw new ForbiddenException('Not authorized to delete these sessions');
    }

    await this.sessionsService.deleteByUserId(userId);
  }
}
