import { Ref, prop } from '@typegoose/typegoose';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsString,
} from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.model';

enum WorkshopStatus {
  ACTIVE = 'active',
  ACTIVE_SEASONAL = 'active_seasonal',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
  HIATUS = 'hiatus',
  PENDING = 'pending',
}

export class Workshop {
  @prop({ ref: 'User', type: () => mongoose.Schema.Types.ObjectId, required: true })
  creator: Ref<User>;

  @prop({ ref: 'User', type: () => [mongoose.Schema.Types.ObjectId], required: true })
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
