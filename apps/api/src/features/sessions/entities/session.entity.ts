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

export enum DeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
  OTHER = 'other',
}

export enum OsType {
  WINDOWS = 'windows',
  MAC = 'mac',
  LINUX = 'linux',
  IOS = 'ios',
  ANDROID = 'android',
  OTHER = 'other',
}

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @Column()
  @ApiProperty()
  expired_at: Date;

  @Column({
    type: 'enum',
    enum: DeviceType,
    default: DeviceType.OTHER,
  })
  @ApiProperty({ enum: DeviceType })
  device_type: DeviceType;

  @Column({
    type: 'enum',
    enum: OsType,
    default: OsType.OTHER,
  })
  @ApiProperty({ enum: OsType })
  os_type: OsType;

  @Column()
  @ApiProperty()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
