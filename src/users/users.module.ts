import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { User } from './user.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Project } from 'src/project/project.model';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Project]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
