import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Project } from './project.model';
import { User } from 'src/users/user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Project]),
    TypegooseModule.forFeature([User]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
