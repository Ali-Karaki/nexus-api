import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResponseI } from 'src/models';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Register a new user' })
  async signUp(@Body(ValidationPipe) registerUserDto: RegisterUserDto): Promise<ResponseI> {
    const result = await this.authService.signUp(registerUserDto);

    if (result.success) {
      await this.emailService.sendWelcomeMessage((result.message as any).email);
    }

    return result;
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Login user with email and password' })
  async signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<ResponseI> {
    return await this.authService.signIn(loginUserDto);
  }

  @Post('/password-recovery')
  @ApiOperation({ summary: 'Password recovery' })
  async passwordRecovery(@Body(ValidationPipe) passwordRecoveryDto: PasswordRecoveryDto): Promise<ResponseI> {
    const result = await this.authService.passwordRecovery(passwordRecoveryDto);

    if (result.success) {
      await this.emailService.sendPasswordRecoveryMessage(passwordRecoveryDto.email, result.message as string);
    }

    return result;
  }
}
