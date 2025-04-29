import { LoggerModule } from '@/common/modules';
import { validateEnv } from '@/common/utils';
import { DatabaseModule } from '@/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HealthModule } from './features/health/health.module';

@Module({
  imports: [
    LoggerModule,
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    DatabaseModule,
    HealthModule,
  ],
})
export class AppModule {}
