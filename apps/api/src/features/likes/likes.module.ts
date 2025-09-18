import { FileModule } from '@/common/modules';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncesModule } from '../annonces/annonces.module';
import { LikesController } from './likes.controller';
import { Like } from './entities/like.entity';
import { LikesService } from './likes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    FileModule,
    AnnoncesModule,
  ],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
