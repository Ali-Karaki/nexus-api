import { Module } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { WorkshopController } from './workshop.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Workshop } from './workshop.model';

@Module({
  imports: [TypegooseModule.forFeature([Workshop])],
  providers: [WorkshopService],
  controllers: [WorkshopController],
})
export class WorkshopModule {}
