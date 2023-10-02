import * as mongoose from 'mongoose';

export class JwtPayloadDto {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
}
