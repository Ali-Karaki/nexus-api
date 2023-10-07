import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { User } from './user.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService]
})
export class UsersModule {}
