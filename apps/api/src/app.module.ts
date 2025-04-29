import { EmailModule, FileModule, LoggerModule } from '@/common/modules';
import { validateEnv } from '@/common/utils';
import { DatabaseModule } from '@/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { PaginationModule } from './common/modules/pagination.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { AnnoncesModule } from './features/annonces/annonces.module';
import { AuthModule } from './features/auth/auth.module';
import { HealthModule } from './features/health/health.module';
import { RolesModule } from './features/roles/roles.module';
import { SessionsModule } from './features/sessions/sessions.module';
import { UsersModule } from './features/users/users.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtStrategy,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    LoggerModule,
    EmailModule,
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    DatabaseModule,
    HealthModule,
    UsersModule,
    SessionsModule,
    AuthModule,
    RolesModule,
    AnnoncesModule,
    PaginationModule,
  ],
})
export class AppModule {}
