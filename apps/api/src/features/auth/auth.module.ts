import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EmailModule, FileModule } from '@/common/modules';
import { DevicesModule } from '../devices/devices.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [EmailModule, FileModule, UsersModule, DevicesModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, AuthSerializer],
})
export class AuthModule {}
