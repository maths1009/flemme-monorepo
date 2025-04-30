import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 100 })
  @ApiProperty()
  firstname: string;

  @Column({ length: 100 })
  @ApiProperty()
  lastname: string;

  @Column({ length: 100 })
  @ApiProperty()
  username: string;

  @Column({ length: 150, unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ length: 255, nullable: true })
  @ApiPropertyOptional()
  profile_picture_url?: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @Column({ length: 20, unique: true })
  @ApiProperty()
  phone_number: string;

  @Column({ default: false })
  @ApiProperty()
  phone_verified: boolean;

  @Column({ default: true })
  @ApiProperty()
  notif_enabled: boolean;

  @Column({ default: 0 })
  @ApiProperty()
  score: number;

  @Column({ default: 1 })
  @ApiProperty()
  role_id: number;
}
