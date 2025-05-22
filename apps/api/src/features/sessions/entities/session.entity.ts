import { DateTransformer } from '@/common/transformers';
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

  @Column()
  @ApiProperty()
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @ApiProperty()
  browser: string;

  @Column()
  @ApiProperty()
  device: string;

  @CreateDateColumn({
    type: 'varchar',
    length: 30,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new DateTransformer(),
  })
  @ApiProperty()
  created_at: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new DateTransformer(),
  })
  @ApiProperty()
  last_used_at: string;

  @Column({
    type: 'varchar',
    length: 30,
    transformer: new DateTransformer(),
  })
  @ApiProperty()
  expired_at: string;
}
