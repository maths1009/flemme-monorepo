import { Global, Module } from '@nestjs/common';
import { FILE_SERVICE } from '../services/file.service';
import { MinioFileService } from '../services/minio-file.service';

@Global()
@Module({
  providers: [
    {
      provide: FILE_SERVICE,
      useClass: MinioFileService,
    },
    MinioFileService,
  ],
  exports: [FILE_SERVICE, MinioFileService],
})
export class FileModule {}
