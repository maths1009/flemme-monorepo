import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EmailModule, FileModule, LoggerModule, RedisModule } from '@/common/modules';
import { validateEnv } from '@/common/utils';
import { DatabaseModule } from '@/database';
import { RolesGuard } from './common/guards/roles.guard';
import { SessionAuthGuard } from './common/guards/session-auth.guard';
import { PaginationModule } from './common/modules/pagination.module';
import { AnnoncesModule } from './features/annonces/annonces.module';
import { AuthModule } from './features/auth/auth.module';
import { DevicesModule } from './features/devices/devices.module';
import { FeedbackModule } from './features/feedbacks/feedback.module';
import { LikesModule } from './features/likes/likes.module';
import { RolesModule } from './features/roles/roles.module';
import { TrackingsModule } from './features/trackings/trackings.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    LoggerModule,
    RedisModule,
    EmailModule,
    FileModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: validateEnv,
    }),
    DatabaseModule,
    UsersModule,
    DevicesModule,
    AuthModule,
    RolesModule,
    AnnoncesModule,
    FeedbackModule,
    LikesModule,
    TrackingsModule,
    PaginationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
