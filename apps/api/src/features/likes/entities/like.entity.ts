import { Annonce } from '@/features/annonces/entities/annonce.entity';
import { User } from '@/features/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('likes')
@Unique(['user_id', 'annonce_id'])
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column()
  user_id: string;

  @Column()
  annonce_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Annonce, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'annonce_id' })
  annonce: Annonce;
}
