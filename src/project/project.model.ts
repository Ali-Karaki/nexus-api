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

enum ProjectStatus {
  ACTIVE = 'active',
  ACTIVE_SEASONAL = 'active_seasonal',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
  HIATUS = 'hiatus',
  PENDING = 'pending',
}

enum ProjectLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export class Project {
  @prop({
    ref: 'User',
    type: () => mongoose.Schema.Types.ObjectId,
    required: true,
  })
  creator: Ref<User>;

  @prop({
    ref: 'User',
    type: () => [mongoose.Schema.Types.ObjectId],
    required: true,
  })
  collaborators: Ref<User>[];

  @IsString()
  @prop({ unique: true, required: true })
  name: string;

  @IsString()
  @prop({ required: true })
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @prop({ required: true, type: [String] })
  keywords: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @prop({ required: true, type: [String] })
  researchFields: string[];

  @IsEnum(ProjectStatus)
  @prop({ required: true, enum: ProjectStatus })
  status: ProjectStatus;

  @IsEnum(ProjectLevel)
  @prop({ required: true, enum: ProjectLevel })
  level: ProjectLevel;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @prop({ required: true, type: [String] })
  sponsors: string[];

  @IsString()
  @prop({ required: true })
  geographicScope: string;

  @prop({ required: true, type: String })
  participantsAge: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @prop({ required: true, type: [String] })
  goals: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @prop({ required: true, type: [String] })
  participationTasks: string[];

  @IsString()
  @prop({ required: true })
  email: string;

  @IsDate()
  @prop({ required: true })
  startDate: Date;

  @IsArray()
  @IsString({ each: true })
  @prop({
    ref: 'users',
    type: () => [mongoose.Schema.Types.ObjectId],
    required: false,
  })
  watching: Ref<User>[];

  @prop({ default: Date.now })
  createdAt: Date;

  @prop({ default: Date.now })
  updatedAt: Date;
}
