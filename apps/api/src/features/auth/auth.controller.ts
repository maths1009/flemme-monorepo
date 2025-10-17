import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  ConflictException,
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
import { Request } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { UserErrorMessages } from '../users/errors/user-error-message';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { ConfirmResetPasswordDto, RequestResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { AuthErrorMessages } from './errors/auth-error-messages.enum';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connect user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    description: 'Connection successful',
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
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiException(() => ConflictException, {
    description: UserErrorMessages.USER_ALREADY_EXISTS,
  })
  @ApiResponse({
    description: 'User created successfully',
    status: HttpStatus.CREATED,
    type: RegisterResponseDto,
  })
  async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
    return await this.authService.register(registerDto, req.headers['user-agent'], req.ip);
  }

  @Post('logout')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Disconnect user' })
  @ApiResponse({
    description: 'Disconnection successful',
    status: HttpStatus.ACCEPTED,
  })
  async logout(@Req() req: Request) {
    const user = req.user!;
    await this.authService.logout(user.sessionId);
  }

  @Post('logout-all')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Disconnect user from all sessions',
  })
  @ApiResponse({
    description: 'Disconnection successful from all sessions',
    status: HttpStatus.ACCEPTED,
  })
  async logoutAll(@Req() req: Request) {
    const user = req.user!;
    await this.authService.logoutAll(user?.id);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Verify email' })
  @ApiBody({ type: VerifyEmailDto })
  @ApiResponse({
    description: 'Email verified successfully',
    status: HttpStatus.ACCEPTED,
  })
  @ApiException(() => NotFoundException, {
    description: UserErrorMessages.USER_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: AuthErrorMessages.INVALID_VERIFICATION_CODE,
  })
  @ApiException(() => BadRequestException, {
    description: AuthErrorMessages.VERIFICATION_CODE_EXPIRED,
  })
  @ApiException(() => BadRequestException, {
    description: AuthErrorMessages.EMAIL_ALREADY_VERIFIED,
  })
  async verifyEmail(@Req() req: Request, @Body() verifyEmailDto: VerifyEmailDto) {
    const user = req.user!;
    await this.authService.verifyEmail(user.id, verifyEmailDto.code);
  }

  @Post('resend-email-verification')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Resend email verification' })
  @ApiResponse({
    description: 'Email verification resend successfully',
    status: HttpStatus.ACCEPTED,
  })
  @ApiException(() => BadRequestException, {
    description: AuthErrorMessages.EMAIL_ALREADY_VERIFIED,
  })
  async resendEmailVerification(@Req() req: Request) {
    const user = req.user!;
    await this.authService.sendEmailVerificationEmail(user as any);
  }

  @Public()
  @Post('request-password-reset')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiBody({ type: RequestResetPasswordDto })
  @ApiResponse({
    description: 'Password reset email sent if user exists',
    status: HttpStatus.ACCEPTED,
  })
  async requestPasswordReset(@Body() requestResetPasswordDto: RequestResetPasswordDto) {
    await this.authService.requestPasswordReset(requestResetPasswordDto);
  }

  @Public()
  @Post('confirm-password-reset')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Confirm password reset' })
  @ApiBody({ type: ConfirmResetPasswordDto })
  @ApiResponse({
    description: 'Password reset successfully',
    status: HttpStatus.ACCEPTED,
  })
  @ApiException(() => BadRequestException, {
    description: AuthErrorMessages.INVALID_RESET_TOKEN,
  })
  @ApiException(() => BadRequestException, {
    description: AuthErrorMessages.RESET_TOKEN_EXPIRED,
  })
  async confirmPasswordReset(@Body() confirmResetPasswordDto: ConfirmResetPasswordDto) {
    await this.authService.confirmPasswordReset(confirmResetPasswordDto);
  }
}
