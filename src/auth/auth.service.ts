import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { AuthHelpers } from 'src/helpers/auth.helpers';
import { ResponseI } from 'src/models';
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/users.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
    private readonly userService: UserService,
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

      const { message } = await this.signIn({ email, password });
      return {
        success: true,
        message,
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

    const { message: user } = await this.userService.findOneByEmail(
      loginUserDto.email,
    );
    const accessToken = this.jwtService.sign(payload);
    return {
      success: true,
      message: {
        accessToken,
        user,
      },
    };
  }

  async passwordRecovery(
    passwordRecoveryDto: PasswordRecoveryDto,
  ): Promise<ResponseI> {
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
