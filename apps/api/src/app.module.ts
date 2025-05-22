import { LoggerModule } from '@/common/modules';
import { validateEnv } from '@/common/utils';
import { DatabaseModule } from '@/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './features/auth/auth.module';
import { HealthModule } from './features/health/health.module';
import { SessionsModule } from './features/sessions/sessions.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    DatabaseModule,
    HealthModule,
    UsersModule,
    SessionsModule,
    AuthModule,
  ],
})
export class AppModule {}
