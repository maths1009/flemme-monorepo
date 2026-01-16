import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';

@Module({
  exports: [DevicesService],
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DevicesService],
})
export class DevicesModule {}
