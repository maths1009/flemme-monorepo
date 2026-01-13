import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const options: DataSourceOptions = {
  database: process.env.DB_NAME || 'flemme',
  entities: [path.join(__dirname, '**/*.entity.{ts,js}')],
  host: process.env.DB_HOST || 'localhost',
  logging: false,
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  synchronize: true,
  type: 'mariadb',
  username: process.env.DB_USER || 'root',
};

export const AppDataSource = new DataSource(options);
