import { LoggerModule } from '@/common/modules';
import { JwtService } from '@/common/services';
import { validateEnv } from '@/common/utils';
import { DatabaseModule } from '@/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { IsUniqueConstraint } from './common/decorators';
import { JwtAuthGuard } from './common/guards';
import { AuthModule } from './features/auth/auth.module';
import { HealthModule } from './features/health/health.module';
import { UsersModule } from './features/users/users.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtService,
    IsUniqueConstraint,
  ],
  imports: [
    LoggerModule,
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    DatabaseModule,
    HealthModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
