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

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @Column({ type: 'int', nullable: true })
  email_verification_code?: number | null;

  @Column({ type: 'datetime', nullable: true })
  email_verification_expired_at?: Date | null;

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
