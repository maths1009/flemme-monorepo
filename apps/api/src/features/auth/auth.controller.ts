import { ApiJwtResponse, User } from '@/common/decorators';
import { ApiValidationResponse } from '@/common/decorators/api-validation-response.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { RequestWithUser, TokenPayload } from '@/common/interfaces';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeviceType, OsType } from '../sessions/entities/session.entity';
import { AuthService } from './auth.service';
import { SignInDto, SignInResponseDto } from './dto/sign-in.dto';
import { SignUpDto, SignUpResponseDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  /* DOC */
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
    type: SignUpResponseDto,
  })
  @ApiValidationResponse()
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  /* DOC */
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully signed in',
    type: SignInResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async signIn(@Req() req: RequestWithUser): Promise<SignInResponseDto> {
    const deviceType = DeviceType.OTHER;
    const osType = OsType.OTHER;

    return this.authService.signIn(req.user, deviceType, osType);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  /* DOC */
  @ApiOperation({ summary: 'Sign out the current user' })
  @ApiJwtResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully signed out',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Session not found',
  })
  async signOut(@User() user: TokenPayload): Promise<string> {
    return this.authService.signOut({ userId: user.sub, sessionId: user.sid });
  }

  @Post('signout-all')
  @HttpCode(HttpStatus.OK)
  /* DOC */
  @ApiOperation({ summary: 'Sign out the current user from all devices' })
  @ApiJwtResponse()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully signed out from all devices',
  })
  async signOutAllDevices(@User('sub') userId: number) {
    return this.authService.signOutAllDevices({ userId });
  }
}
