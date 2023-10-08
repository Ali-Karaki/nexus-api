import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';
import { ResponseI } from 'src/models';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async findById(userId: string): Promise<ResponseI> {
    try {
      const user = await this.userModel
        .findById(userId)
        .select('-password -salt -__v')
        .exec();
      return {
        success: true,
        message: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async findAll(): Promise<ResponseI> {
    try {
      const users = await this.userModel
        .find()
        .select('-password -salt -__v')
        .exec();
      return {
        success: true,
        message: users,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async findOneByEmail(email: string): Promise<ResponseI> {
    try {
      const user = await this.userModel
        .findOne({ email })
        .select('-password -salt -__v');
      return {
        success: true,
        message: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
