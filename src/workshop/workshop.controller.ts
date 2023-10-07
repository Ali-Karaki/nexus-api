import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { Workshop } from './workshop.model';
import { WorkshopService } from './workshop.service';
import { ResponseI } from 'src/models';

@Controller('workshops')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post('/createWorkshop')
  async create(@Body() workshop: Workshop): Promise<ResponseI> {
    return await this.workshopService.create(workshop);
  }

  @Get('/getAllWorkshops')
  async findAll(@Query() filter: any): Promise<ResponseI> {
    for (const key in filter) {
      if (typeof filter[key] === 'string') {
        filter[key] = [filter[key]];
      }
    }
    return await this.workshopService.findAll(filter);
  }

  @Get('/getWorkshopById/:id')
  async findOne(@Param('id') id: string): Promise<ResponseI> {
    return await this.workshopService.findOne(id);
  }

  @Post('/updateWorkshop')
  async update(
    @Body('id') id: string,
    @Body('workshop') updatedWorkshop: Workshop,
  ): Promise<ResponseI> {
    return await this.workshopService.update(id, updatedWorkshop);
  }

  @Post('/deleteWorkshop')
  async delete(@Body('id') id: string): Promise<ResponseI> {
    return await this.workshopService.delete(id);
  }
}
