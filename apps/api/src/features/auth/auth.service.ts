import { SafeUser } from '@/common/interfaces';
import { JwtService } from '@/common/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SignInResponseDto } from './dto/sign-in.dto';
import { SignUpDto, SignUpResponseDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtUtils: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, role_id, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = this.usersRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    const payload = this.jwtUtils.createTokenPayload(savedUser.id);
    const { password, role_id, ...result } = savedUser;

    return {
      access_token: this.jwtUtils.signToken(payload),
      user: result,
    };
  }

  async signIn(user: SafeUser): Promise<SignInResponseDto> {
    const payload = this.jwtUtils.createTokenPayload(user.id);
    const token = this.jwtUtils.signToken(payload);
    return {
      access_token: token,
      user,
    };
  }

  async signOut(userId: number) {
    console.log(`User with ID ${userId} signed out`);
    return { message: userId };
  }

  async signOutAllDevices(userId: number) {
    // In a real application, you would invalidate all tokens for this user
    // This could be done by adding all tokens to a blacklist
    return { message: 'Successfully signed out from all devices' };
  }
}
