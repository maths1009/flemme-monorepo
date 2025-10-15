import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { UserErrorMessages } from '../users/errors/user-error-message';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connecter un utilisateur' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    description: 'Connexion réussie',
    status: HttpStatus.OK,
    type: LoginResponseDto,
  })
  @ApiException(() => UnauthorizedException)
  async login(@Req() req: Request) {
    return this.authService.login(req.user as any, req.headers['user-agent'] || 'unknown');
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Inscrire un nouvel utilisateur' })
  @ApiBody({ type: RegisterDto })
  @ApiException(() => ConflictException, {
    description: UserErrorMessages.USER_ALREADY_EXISTS,
  })
  @ApiResponse({
    description: 'Utilisateur créé avec succès',
    status: HttpStatus.CREATED,
    type: RegisterResponseDto,
  })
  async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
    return await this.authService.register(registerDto, req.headers['user-agent'] || 'unknown');
  }

  @Post('logout')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Déconnecter un utilisateur' })
  @ApiResponse({
    description: 'Déconnexion réussie',
    status: HttpStatus.ACCEPTED,
  })
  async logout(@Req() req: Request) {
    const user = req.user!;
    await this.authService.logout(user.sessionId);
  }

  @Post('logout-all')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Déconnecter un utilisateur de toutes ses sessions',
  })
  @ApiResponse({
    description: 'Déconnexion réussie de toutes les sessions',
    status: HttpStatus.ACCEPTED,
  })
  async logoutAll(@Req() req: Request) {
    const user = req.user!;
    await this.authService.logoutAll(user?.id);
  }
}
