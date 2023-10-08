import { Body, Controller, Get } from '@nestjs/common';
import { ResponseI } from 'src/models';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/getProjectById')
  async findOne(@Body('email') email: string): Promise<ResponseI> {
    return await this.userService.findOneByEmail(email);
  }
}
