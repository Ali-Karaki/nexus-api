import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.model';
import { UserService } from 'src/users/users.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userSerUserService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    const { email } = payload;
    const { message: user } = await this.userSerUserService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException();

    return user as any;
  }
}
