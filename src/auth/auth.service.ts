import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthHelpers } from 'src/helpers/auth.helpers';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { ResponseI } from 'src/models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  async signUp(registerUserDto: RegisterUserDto): Promise<ResponseI> {
    const { email, password } = registerUserDto;

    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new ConflictException('Email already in use');
    }

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await AuthHelpers.hashPassword(password, user.salt);

    try {
      const createdUser = new this.userModel(user);
      await createdUser.save();

      const accessToken = await this.signIn({ email, password });
      return {
        success: true,
        message: {
          accessToken,
          email,
        },
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async signIn(loginUserDto: LoginUserDto): Promise<ResponseI> {
    const payload = await this.validateUserPassword(loginUserDto);

    if (!payload) return { success: false, message: 'Invalid credentials' };

    const accessToken = this.jwtService.sign(payload);
    return { success: true, message: accessToken };
  }

  async passwordRecovery(passwordRecoveryDto: PasswordRecoveryDto): Promise<ResponseI> {
    const user = await this.userModel.findOne({
      email: passwordRecoveryDto.email,
    });

    if (!user) {
      return {
        success: false,
        message: `User with email ${passwordRecoveryDto.email} not found`,
      };
    }

    const newPassword = AuthHelpers.getRandomPassword();

    user.salt = await bcrypt.genSalt();
    user.password = await AuthHelpers.hashPassword(newPassword, user.salt);
    await user.save();
    return { success: true, message: 'New password sent to the email entered' };
  }

  private async validateUserPassword(
    loginUserDto: LoginUserDto,
  ): Promise<JwtPayloadDto> {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email }).exec();

    if (user && (await user.validatePassword(password))) {
      return {
        _id: user._id,
        email: user.email,
      };
    }

    return null;
  }
}
