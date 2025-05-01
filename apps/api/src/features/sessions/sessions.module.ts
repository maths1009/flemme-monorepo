import { JwtService } from '@/common/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionsService } from './sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionsService, JwtService],
  exports: [SessionsService],
})
export class SessionsModule {}
