import {
  BadRequestException,
  PipeTransform,
  Injectable,
} from '@nestjs/common';
import { FileValidationMessages } from '../errors/file-validation-messages.enum';

export interface FileValidationOptions {
  maxSize?: number; 
  allowedMimeTypes?: string[];
  required?: boolean;
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly options: FileValidationOptions = {}) {
    this.options = {
      maxSize: 5 * 1024 * 1024,
      allowedMimeTypes: ['image/jpeg', 'image/png'],
      required: true,
      ...options,
    };
  }

  transform(file: Express.Multer.File): Express.Multer.File {
    if (this.options.required && !file) {
      throw new BadRequestException(FileValidationMessages.FILE_REQUIRED);
    }

    if (!file && !this.options.required) {
      return file;
    }

    if (file && this.options.maxSize && file.size > this.options.maxSize) {
      const maxSizeMB = this.options.maxSize / (1024 * 1024);
      throw new BadRequestException(
        `${FileValidationMessages.FILE_TOO_LARGE} ${maxSizeMB}MB`,
      );
    }

    if (
      file &&
      this.options.allowedMimeTypes &&
      !this.options.allowedMimeTypes.includes(file.mimetype)
    ) {
      throw new BadRequestException(
        `${FileValidationMessages.FILE_TYPE_NOT_ALLOWED} ${this.options.allowedMimeTypes.join(', ')}`,
      );
    }

    return file;
  }
}
