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

  @Post('/signUp')
  @ApiOperation({ summary: 'Register a new user' })
  async signUp(@Body(ValidationPipe) registerUserDto: RegisterUserDto): Promise<ResponseI> {
    const res = await this.authService.signUp(registerUserDto);

    if (res.success) {
      await this.emailService.sendWelcomeMessage((res.message as any).email);
    }

    return res;
  }

  @Post('/signIn')
  @ApiOperation({ summary: 'Login user with email and password' })
  async signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<ResponseI> {
    return await this.authService.signIn(loginUserDto);
  }

  @Post('/password-recovery')
  @ApiOperation({ summary: 'Password recovery' })
  async passwordRecovery(@Body(ValidationPipe) passwordRecoveryDto: PasswordRecoveryDto): Promise<ResponseI> {
    const res = await this.authService.passwordRecovery(passwordRecoveryDto);

    if (res.success) {
      await this.emailService.sendPasswordRecoveryMessage(passwordRecoveryDto.email, res.message as string);
    }

    return res;
  }
}
