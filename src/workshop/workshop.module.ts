import { Module } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { WorkshopController } from './workshop.controller';

@Module({
  providers: [WorkshopService],
  controllers: [WorkshopController]
})
export class WorkshopModule {}
