import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Annonce } from '@/features/annonces/entities/annonce.entity';
import { User } from '@/features/users/entities/user.entity';
import { TrackingStatusEnum } from '../enum/tracking-status.enum';

@Entity('trackings')
export class Tracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  annonce_id: string;

  @Column()
  creator_id: string;

  @Column()
  accepter_id: string;

  @Column({ precision: 10, scale: 2, type: 'decimal' })
  negotiated_price: number;

  @Column({ default: TrackingStatusEnum.IN_PROGRESS, enum: TrackingStatusEnum, type: 'enum' })
  status: TrackingStatusEnum;

  @Column({ nullable: true, type: 'datetime' })
  creator_accepted_at?: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  accepter_accepted_at?: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  creator_completed_at?: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  accepter_confirmed_at?: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  cancelled_at?: Date | null;

  @Column({ nullable: true, type: 'varchar' })
  cancelled_by?: string | null;

  @Column({ type: 'datetime' })
  acceptance_deadline: Date;

  @Column({ nullable: true, type: 'datetime' })
  completion_deadline?: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  confirmation_deadline?: Date | null;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
  updated_at: Date;

  @ManyToOne(() => Annonce, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'annonce_id' })
  annonce: Annonce;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'accepter_id' })
  accepter: User;
}
