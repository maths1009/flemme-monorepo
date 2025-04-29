import { Readable } from 'stream';

export interface FileUploadOptions {
  bucket?: string;
  folder?: string;
  filename?: string;
  contentType?: string;
  metadata?: Record<string, string>;
}

export interface FileInfo {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  url: string;
  bucket: string;
  key: string;
}

export const FILE_SERVICE = 'FILE_SERVICE';

export interface FileServiceInterface {
  upload(
    file: Express.Multer.File | Buffer | Readable,
    options?: FileUploadOptions,
  ): Promise<FileInfo>;

  delete(filename: string, bucket?: string): Promise<void>;

  getUrl(filename: string, bucket?: string): Promise<string>;

  getSignedUrl(
    filename: string,
    bucket?: string,
    expiresIn?: number,
  ): Promise<string>;

  exists(filename: string, bucket?: string): Promise<boolean>;

  getFile(filename: string, bucket?: string): Promise<Buffer>;

  listFiles(
    bucket?: string,
    prefix?: string,
    maxKeys?: number,
  ): Promise<string[]>;
}

export abstract class BaseFileService implements FileServiceInterface {
  protected defaultBucket: string;

  constructor(defaultBucket: string = 'private') {
    this.defaultBucket = defaultBucket;
  }

  protected generateFilename(originalName: string, folder?: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    const baseName = originalName.split('.').slice(0, -1).join('.');
    const sanitizedName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    return `${folder ?? ''}/${timestamp}_${randomString}_${sanitizedName}.${extension}`;
  }

  protected getBucket(bucket?: string): string {
    return bucket || this.defaultBucket;
  }

  abstract upload(
    file: Express.Multer.File | Buffer | Readable,
    options?: FileUploadOptions,
  ): Promise<FileInfo>;

  abstract delete(filename: string, bucket?: string): Promise<void>;

  abstract getUrl(filename: string, bucket?: string): Promise<string>;

  abstract getSignedUrl(
    filename: string,
    bucket?: string,
    expiresIn?: number,
  ): Promise<string>;

  abstract exists(filename: string, bucket?: string): Promise<boolean>;

  abstract getFile(filename: string, bucket?: string): Promise<Buffer>;

  abstract listFiles(
    bucket?: string,
    prefix?: string,
    maxKeys?: number,
  ): Promise<string[]>;
}
