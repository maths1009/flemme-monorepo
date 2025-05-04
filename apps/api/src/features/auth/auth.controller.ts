import { ApiException, ApiJwtResponse, User } from '@/common/decorators';
import { ApiValidationResponse } from '@/common/decorators/api-validation-response.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { RequestWithUser, TokenPayload } from '@/common/interfaces';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeviceType, OsType } from '../sessions/entities/session.entity';
import { SessionsService } from '../sessions/sessions.service';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  /* DOC */
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
    type: RegisterResponseDto,
  })
  @ApiValidationResponse()
  @ApiException([
    () => new BadRequestException('Email is already in use'),
    () => new BadRequestException('Username is already in use'),
  ])
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  /* DOC */
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully authenticated',
    type: LoginResponseDto,
  })
  @ApiException(() => new UnauthorizedException('Invalid credentials'))
  async login(@Req() req: RequestWithUser): Promise<LoginResponseDto> {
    const deviceType = DeviceType.OTHER;
    const osType = OsType.OTHER;

    return this.authService.login(req.user, deviceType, osType);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  /* DOC */
  @ApiOperation({ summary: 'Terminate the current session (logout)' })
  @ApiJwtResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Session successfully terminated',
  })
  @ApiException(() => new NotFoundException('Session not found'))
  async logout(@User() user: TokenPayload): Promise<void> {
    await this.sessionsService.deleteByIdAndUserId(user.sid, user.sub);
  }

  @Post('logout-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  /* DOC */
  @ApiOperation({ summary: 'Terminate all user sessions (global logout)' })
  @ApiJwtResponse()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'All sessions successfully terminated',
  })
  async logoutAll(@User() user: TokenPayload): Promise<void> {
    await this.sessionsService.deleteByUserId(user.sub);
  }
}
