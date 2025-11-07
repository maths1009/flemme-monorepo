import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/features/users/entities/user.entity';

@Entity('annonces')
export class Annonce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
  updated_at: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ precision: 10, scale: 2, type: 'decimal' })
  price: number;

  @Column({ precision: 9, scale: 6, type: 'decimal' })
  latitude: number;

  @Column({ precision: 9, scale: 6, type: 'decimal' })
  longitude: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
