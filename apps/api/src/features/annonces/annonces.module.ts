import { FileModule } from '@/common/modules';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncesController } from './annonces.controller';
import { AnnoncesService } from './annonces.service';
import { Annonce } from './entities/annonce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annonce]), FileModule],
  providers: [AnnoncesService],
  controllers: [AnnoncesController],
  exports: [AnnoncesService],
})
export class AnnoncesModule {}
