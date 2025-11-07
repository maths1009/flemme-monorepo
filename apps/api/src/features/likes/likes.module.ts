import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '@/common/modules';
import { AnnoncesModule } from '../annonces/annonces.module';
import { Like } from './entities/like.entity';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  controllers: [LikesController],
  exports: [LikesService],
  imports: [TypeOrmModule.forFeature([Like]), FileModule, AnnoncesModule],
  providers: [LikesService],
})
export class LikesModule {}
