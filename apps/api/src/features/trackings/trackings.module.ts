import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '@/common/modules';
import { AnnoncesModule } from '../annonces/annonces.module';
import { Tracking } from './entities/tracking.entity';
import { TrackingsController } from './trackings.controller';
import { TrackingsService } from './trackings.service';

@Module({
  controllers: [TrackingsController],
  exports: [TrackingsService],
  imports: [TypeOrmModule.forFeature([Tracking]), AnnoncesModule, FileModule],
  providers: [TrackingsService],
})
export class TrackingsModule {}
