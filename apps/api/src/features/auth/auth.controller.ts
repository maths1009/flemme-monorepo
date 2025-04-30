import { ApiValidationResponse } from '@/common/decorators/api-validation-response.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { User } from '@/common/decorators/user.decorator';
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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto, SignInResponseDto } from './dto/sign-in.dto';
import { SignUpDto, SignUpResponseDto } from './dto/sign-up.dto';

@ApiTags('auth')
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
  @ApiValidationResponse()
  async signIn(@Req() req: RequestWithUser): Promise<SignInResponseDto> {
    return this.authService.signIn(req.user);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign out the current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully signed out',
  })
  async signOut(@User() token: TokenPayload) {
    return this.authService.signOut(token.sub);
  }

  @Post('signout-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign out the current user from all devices' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully signed out from all devices',
  })
  async signOutAllDevices(@User() token: TokenPayload) {
    return this.authService.signOutAllDevices(token.sub);
  }
}
