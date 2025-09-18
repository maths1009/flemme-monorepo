import { User } from '@/features/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ type: 'datetime' })
  expired_at: Date;

  @Column({ type: 'datetime' })
  last_used_at: Date;

  @Column({
    type: 'varchar',
    default: 'unknown',
  })
  browser_type: string;

  @Column({
    type: 'varchar',
    default: 'unknown',
  })
  os_type: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
