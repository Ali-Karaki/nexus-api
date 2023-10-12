import { Ref, prop } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { Project } from 'src/project/project.model';

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

  @prop({
    ref: 'projects',
    type: () => [mongoose.Schema.Types.ObjectId],
  })
  watching: Ref<Project>[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
