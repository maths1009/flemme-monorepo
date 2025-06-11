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

  @Column({ length: 100, unique: true })
  @ApiProperty()
  username: string;

  @Column({ length: 150, unique: true })
  @ApiProperty()
  email: string;

  @Column({ length: 255 })
  @ApiProperty()
  password: string;

  @Column({ default: false })
  @ApiProperty()
  email_verified: boolean;

  @Column({ length: 6, nullable: true })
  @ApiPropertyOptional()
  email_verification_code?: string;

  @Column({ type: 'datetime', nullable: true })
  @ApiPropertyOptional()
  email_verification_expired_at?: Date;

  @Column({ length: 255, nullable: true })
  @ApiPropertyOptional()
  profile_picture_url?: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  @ApiPropertyOptional()
  suspended_at?: Date;

  @Column({ default: true })
  @ApiProperty()
  notif_enabled: boolean;

  @Column({ default: 0 })
  @ApiProperty()
  score: number;
}
