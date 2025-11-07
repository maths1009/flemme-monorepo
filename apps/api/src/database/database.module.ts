import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from '@/common/utils';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        autoLoadEntities: true,
        database: config.get('DB_NAME'),
        host: config.get('DB_HOST'),
        logging: config.get('NODE_ENV') !== 'production',
        password: config.get('DB_PASSWORD'),
        port: config.get('DB_PORT'),
        synchronize: config.get('NODE_ENV') !== 'production',
        type: 'mariadb',
        username: config.get('DB_USER'),
      }),
    }),
  ],
})
export class DatabaseModule {}
