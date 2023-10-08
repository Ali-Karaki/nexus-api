import { Ref, prop } from '@typegoose/typegoose';
import { IsDate, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.model';

export class Workshop {
  @prop({
    ref: 'users',
    type: () => mongoose.Schema.Types.ObjectId,
    required: true,
  })
  creator: Ref<User>;

  @prop({
    ref: 'users',
    type: () => [mongoose.Schema.Types.ObjectId],
    required: true,
  })
  attendees: Ref<User>[];

  @IsString()
  @prop({ unique: true, required: true })
  name: string;

  @IsString()
  @prop({ required: true })
  description: string;

  @IsString()
  @prop({ required: true })
  host: string;

  @IsString()
  @prop({ required: true })
  location: string;

  @IsString()
  @prop({ required: true })
  organizer: string;

  @IsDate()
  @prop({ required: true })
  startDate: Date;

  @IsDate()
  @prop({ required: true })
  endDate: Date;

  @prop({ default: Date.now })
  createdAt: Date;

  @prop({ default: Date.now })
  updatedAt: Date;
}
