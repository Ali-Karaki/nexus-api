import { prop } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @IsString()
  @prop({ unique: true, required: true })
  email: string;

  @IsString()
  @prop({ required: true })
  fullName: string;

  @IsString()
  @prop({ required: true, hidden: true })
  password: string;

  @IsString()
  @prop({ required: true, hidden: true })
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
