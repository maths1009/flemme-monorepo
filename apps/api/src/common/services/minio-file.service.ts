import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { Readable } from 'stream';
import { Env } from '../utils';
import { BaseFileService, FileInfo, FileUploadOptions } from './file.service';

@Injectable()
export class MinioFileService extends BaseFileService {
  private readonly logger = new Logger(MinioFileService.name);
  private readonly minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService<Env>) {
    super();

    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT')!,
      port: this.configService.get('MINIO_PORT'),
      useSSL: this.configService.get('NODE_ENV') === 'production',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });

    this.initializeBuckets();
  }

  private async initializeBuckets(): Promise<void> {
    const buckets = [this.defaultBucket, 'profile-picture'];

    for (const bucket of buckets) {
      try {
        const bucketExists = await this.minioClient.bucketExists(bucket);
        if (!bucketExists) {
          await this.minioClient.makeBucket(bucket, 'us-east-1');
          this.logger.log(`Bucket ${bucket} créé avec succès`);
        }
      } catch (error) {
        this.logger.error(
          `Erreur lors de l'initialisation du bucket ${bucket}: ${error}`,
        );
      }
    }
  }

  async upload(
    file: Express.Multer.File | Buffer | Readable,
    options?: FileUploadOptions,
  ): Promise<FileInfo> {
    try {
      let buffer: Buffer;
      let originalName: string;
      let mimetype: string;

      switch (true) {
        case Buffer.isBuffer(file):
          buffer = file;
          originalName = options?.filename ?? `file_${Date.now()}`;
          mimetype = options?.contentType ?? 'application/octet-stream';
          break;
        case file instanceof Readable:
          buffer = await this.streamToBuffer(file);
          originalName = options?.filename ?? `file_${Date.now()}`;
          mimetype = options?.contentType ?? 'application/octet-stream';
          break;
        default:
          buffer = file.buffer;
          originalName = file.originalname;
          mimetype = file.mimetype;
      }

      const bucket = this.getBucket(options?.bucket);
      const filename =
        options?.filename ??
        this.generateFilename(originalName, options?.folder);
      const metadata = options?.metadata ?? {};

      await this.minioClient.putObject(
        bucket,
        filename,
        buffer,
        buffer.length,
        {
          'Content-Type': mimetype,
          ...metadata,
        },
      );

      const url = await this.getUrl(filename, bucket);

      return {
        filename,
        originalName,
        size: buffer.length,
        mimetype,
        url,
        bucket,
        key: filename,
      };
    } catch (error) {
      this.logger.error(`Erreur lors de l'upload du fichier: ${error}`);
      throw new Error(`Échec de l'upload du fichier: ${error}`);
    }
  }

  async delete(filename: string, bucket?: string): Promise<void> {
    try {
      const bucketName = this.getBucket(bucket);
      await this.minioClient.removeObject(bucketName, filename);
      this.logger.log(`Fichier ${filename} supprimé avec succès`);
    } catch (error) {
      this.logger.error(
        `Erreur lors de la suppression du fichier ${filename}: ${error}`,
      );
      throw new Error(`Échec de la suppression du fichier: ${error}`);
    }
  }

  async getUrl(filename: string, bucket?: string): Promise<string> {
    const bucketName = this.getBucket(bucket);
    const endpoint = this.configService.get('MINIO_ENDPOINT')!;
    const port = this.configService.get('MINIO_PORT')!;
    const protocol =
      this.configService.get('NODE_ENV') === 'production' ? 'https' : 'http';

    return `${protocol}://${endpoint}:${port}/${bucketName}/${filename}`;
  }

  async getSignedUrl(
    filename: string,
    bucket?: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    try {
      const bucketName = this.getBucket(bucket);
      return await this.minioClient.presignedGetObject(
        bucketName,
        filename,
        expiresIn,
      );
    } catch (error) {
      this.logger.error(
        `Erreur lors de la génération de l'URL signée: ${error}`,
      );
      throw new Error(`Échec de la génération de l'URL signée: ${error}`);
    }
  }

  async exists(filename: string, bucket?: string): Promise<boolean> {
    try {
      const bucketName = this.getBucket(bucket);
      await this.minioClient.statObject(bucketName, filename);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getFile(filename: string, bucket?: string): Promise<Buffer> {
    try {
      const bucketName = this.getBucket(bucket);
      const stream = await this.minioClient.getObject(bucketName, filename);
      return await this.streamToBuffer(stream);
    } catch (error) {
      this.logger.error(
        `Erreur lors de la récupération du fichier ${filename}: ${error}`,
      );
      throw new Error(`Échec de la récupération du fichier: ${error}`);
    }
  }

  async listFiles(
    bucket?: string,
    prefix?: string,
    maxKeys: number = 1000,
  ): Promise<string[]> {
    try {
      const bucketName = this.getBucket(bucket);
      const files: string[] = [];

      const stream = this.minioClient.listObjects(bucketName, prefix, true);

      return new Promise((resolve, reject) => {
        stream.on('data', (obj) => {
          files.push(obj.name ?? '');
          if (files.length >= maxKeys) {
            stream.destroy();
          }
        });

        stream.on('end', () => {
          resolve(files);
        });

        stream.on('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      this.logger.error(`Erreur lors de la liste des fichiers: ${error}`);
      throw new Error(`Échec de la liste des fichiers: ${error}`);
    }
  }

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      stream.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk));
      });

      stream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      stream.on('error', (error) => {
        reject(error);
      });
    });
  }
}
