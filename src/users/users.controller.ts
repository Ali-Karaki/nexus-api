import { Controller, Get, Param } from '@nestjs/common';
import { ResponseI } from 'src/models';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/getUserById/:id')
  async findOne(@Param('id') id: string): Promise<ResponseI> {
    return await this.userService.findById(id);
  }

  @Get('/getAllUsers')
  async findAll(): Promise<ResponseI> {
    return await this.userService.findAll();
  }

  @Get('/getKeywordsPerUser/:id')
  async findKeywords(@Param('id') id: string): Promise<ResponseI> {
    return await this.userService.findKeywords(id);
  }
}
