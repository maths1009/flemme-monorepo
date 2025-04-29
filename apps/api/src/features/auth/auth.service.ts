import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, role_id, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = this.usersRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    const { password, role_id, ...result } = savedUser;

    return result;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto.email, signInDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
  }

  async signOut(userId: number) {
    // In a real application, you would invalidate the token
    // This could be done by adding the token to a blacklist
    return { message: 'Successfully signed out' };
  }

  async signOutAllDevices(userId: number) {
    // In a real application, you would invalidate all tokens for this user
    // This could be done by adding all tokens to a blacklist
    return { message: 'Successfully signed out from all devices' };
  }
}
