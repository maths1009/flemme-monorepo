import { User } from '@/features/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: number;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime' })
  @ApiProperty()
  expired_at: Date;

  @Column({ type: 'datetime' })
  @ApiProperty()
  last_used_at: Date;

  @Column({
    type: 'varchar',
    default: 'unknown',
  })
  @ApiProperty({ type: 'string', default: 'unknown' })
  browser_type: string;

  @Column({
    type: 'varchar',
    default: 'unknown',
  })
  @ApiProperty({ type: 'string', default: 'unknown' })
  os_type: string;

  @Column()
  @ApiProperty()
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
