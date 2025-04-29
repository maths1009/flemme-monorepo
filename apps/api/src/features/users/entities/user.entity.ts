import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ length: 100 })
  username: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 255, nullable: true })
  profile_picture_url: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ length: 20, unique: true })
  phone_number: string;

  @Column({ default: false })
  phone_verified: boolean;

  @Column({ default: true })
  notif_enabled: boolean;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 1 })
  role_id: number;
}
