import { DateTransformer } from '@/common/transformers';
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

  @Column({ default: false })
  @ApiProperty()
  email_verified: boolean;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ length: 255, nullable: true })
  @ApiPropertyOptional()
  profile_picture_url?: string;

  @CreateDateColumn({
    type: 'varchar',
    length: 30,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new DateTransformer(),
  })
  @ApiProperty()
  created_at: string;

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
