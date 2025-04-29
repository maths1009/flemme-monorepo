import { Role } from '@/features/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ length: 6, nullable: true })
  email_verification_code?: string;

  @Column({ type: 'datetime', nullable: true })
  email_verification_expired_at?: Date;

  @Column({ length: 255, nullable: true })
  profile_picture_url?: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  suspended_at?: Date;

  @Column({ default: true })
  notif_enabled: boolean;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 2 })
  role_id: number;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
