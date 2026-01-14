import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '@/features/roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 100, unique: true, nullable: true })
  username?: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: false, type: 'boolean' })
  email_verified: boolean;

  @Column({ nullable: true, type: 'int' })
  email_verification_code?: number | null;

  @Column({ nullable: true, type: 'datetime' })
  email_verification_expired_at?: Date | null;

  @Column({ nullable: true, type: 'varchar', unique: true })
  password_reset_token?: string | null;

  @Column({ nullable: true, type: 'datetime' })
  password_reset_expired_at?: Date | null;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  updated_at: Date;

  @Column({ nullable: true, type: 'datetime' })
  suspended_at?: Date;

  @Column({ default: true })
  notif_enabled: boolean;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 0 })
  average_response_time: number;

  @Column({ nullable: true })
  role_id?: number;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role?: Role;
}
