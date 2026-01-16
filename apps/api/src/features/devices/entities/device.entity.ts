import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { User } from '@/features/users/entities/user.entity';

@Entity('devices')
export class Device {
  @PrimaryColumn({ length: 255, type: 'varchar' })
  id: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  created_at: Date;

  @Column({ type: 'datetime' })
  expired_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
  last_used_at: Date;

  @Column({ nullable: true, type: 'varchar' })
  user_agent?: string;

  @Column({ nullable: true, type: 'varchar' })
  ip?: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
