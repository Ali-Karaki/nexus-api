import { Module } from '@nestjs/common';
import { AppImports } from './app.imports';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { ProjectModule } from './project/project.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { WorkshopModule } from './workshop/workshop.module';

@Module({
  imports: [
    ...AppImports,
    UsersModule,
    AuthModule,
    EmailModule,
    ProjectModule,
    ChatModule,
    WorkshopModule,
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
