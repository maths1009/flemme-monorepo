import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as Minio from 'minio';
import { Readable } from 'stream';
import { MinioFileService } from './minio-file.service';

// Mock Minio Client
const mockMinioClient = {
  bucketExists: jest.fn(),
  getObject: jest.fn(),
  listObjects: jest.fn(),
  makeBucket: jest.fn(),
  presignedGetObject: jest.fn(),
  putObject: jest.fn(),
  removeObject: jest.fn(),
  statObject: jest.fn(),
};

jest.mock('minio', () => {
  return {
    Client: jest.fn().mockImplementation(() => mockMinioClient),
  };
});

describe('MinioFileService', () => {
  let service: MinioFileService;
  let configService: DeepMocked<ConfigService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MinioFileService,
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(),
        },
      ],
    }).compile();

    configService = module.get(ConfigService);
    // configService must be set up before service instantiation for constructor calls
    configService.get.mockImplementation((key: string) => {
      if (key === 'MINIO_ENDPOINT') return 'localhost';
      if (key === 'MINIO_PORT') return 9000;
      return null;
    });

    service = module.get<MinioFileService>(MinioFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('initialization', () => {
    it('should create buckets if they do not exist', async () => {
      mockMinioClient.bucketExists.mockResolvedValue(false);

      // Re-instantiate to trigger constructor logic
      new MinioFileService(configService);

      // Allow async constructor warnings to resolve
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(mockMinioClient.bucketExists).toHaveBeenCalled();
      expect(mockMinioClient.makeBucket).toHaveBeenCalled();
    });
  });

  describe('upload', () => {
    const bucket = 'default-bucket'; // assuming default behavior from file service base or enum

    it('should upload buffer successfully', async () => {
      const buffer = Buffer.from('test');
      const result = await service.upload(buffer, { bucket, filename: 'test.txt' });

      expect(mockMinioClient.putObject).toHaveBeenCalledWith(
        bucket,
        'test.txt',
        buffer,
        buffer.length,
        expect.any(Object),
      );
      expect(result.url).toContain('test.txt');
    });

    it('should throw error on upload failure', async () => {
      mockMinioClient.putObject.mockRejectedValue(new Error('Upload failed'));
      const buffer = Buffer.from('test');

      await expect(service.upload(buffer, { bucket })).rejects.toThrow('Error uploading file');
    });
  });

  describe('delete', () => {
    it('should delete file successfully', async () => {
      await service.delete('test.txt', 'bucket');
      expect(mockMinioClient.removeObject).toHaveBeenCalledWith('bucket', 'test.txt');
    });

    it('should throw error on delete failure', async () => {
      mockMinioClient.removeObject.mockRejectedValue(new Error('Delete failed'));
      await expect(service.delete('test.txt', 'bucket')).rejects.toThrow('Error deleting file');
    });
  });

  describe('exists', () => {
    it('should return true if file exists', async () => {
      mockMinioClient.statObject.mockResolvedValue({} as any);
      const exists = await service.exists('test.txt', 'bucket');
      expect(exists).toBe(true);
    });

    it('should return false if file does not exist', async () => {
      mockMinioClient.statObject.mockRejectedValue(new Error('Not found'));
      const exists = await service.exists('test.txt', 'bucket');
      expect(exists).toBe(false);
    });
  });

  describe('getUrl and getSignedUrl', () => {
    it('should return public url', async () => {
      const url = await service.getUrl('test.txt', 'bucket');
      expect(url).toContain('localhost:9000/bucket/test.txt');
    });

    it('should return signed url', async () => {
      mockMinioClient.presignedGetObject.mockResolvedValue('http://signed-url');
      const url = await service.getSignedUrl('test.txt', 'bucket');
      expect(url).toBe('http://signed-url');
    });
  });

  describe('getFile', () => {
    it('should return file buffer', async () => {
      const stream = Readable.from(['test content']);
      mockMinioClient.getObject.mockResolvedValue(stream);

      const buffer = await service.getFile('test.txt', 'bucket');
      expect(buffer.toString()).toBe('test content');
    });

    it('should throw error on retrieval failure', async () => {
      mockMinioClient.getObject.mockRejectedValue(new Error('Get failed'));
      await expect(service.getFile('test.txt', 'bucket')).rejects.toThrow('Error retrieving file');
    });
  });
});
