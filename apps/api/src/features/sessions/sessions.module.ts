import { JwtService } from '@/common/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionsService } from './sessions.service';
import { UserSessionsController } from './user-sessions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [UserSessionsController],
  providers: [SessionsService, JwtService],
  exports: [SessionsService],
})
export class SessionsModule {}
