import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/features/users/entities/user.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  created_at: Date;

  @Column({ type: 'datetime' })
  expired_at: Date;

  @Column({ type: 'datetime' })
  last_used_at: Date;

  @Column({
    default: 'unknown',
    type: 'varchar',
  })
  browser_type: string;

  @Column({
    default: 'unknown',
    type: 'varchar',
  })
  os_type: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
