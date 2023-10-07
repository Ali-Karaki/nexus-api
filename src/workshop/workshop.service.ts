import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Workshop } from './workshop.model';
import { ResponseI } from 'src/models';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectModel(Workshop)
    private readonly workshopModel: ReturnModelType<typeof Workshop>,
  ) {}

  async create(workshop: Workshop): Promise<ResponseI> {
    try {
      const newWorkshop = new this.workshopModel(workshop);
      await newWorkshop.save();
      return {
        success: true,
        message: newWorkshop,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async findAll(filter: any): Promise<ResponseI> {
    try {
      let generalQueries = [];
      let specificQueries = [];

      if (filter.generalSearch) {
        const generalSearchString = filter.generalSearch;
        const regexFilter = new RegExp(generalSearchString, 'i');

        for (let path in this.workshopModel.schema.paths) {
          const pathType = this.workshopModel.schema.paths[path];

          if (pathType.instance === 'String') {
            let condition = {};
            condition[path] = regexFilter;
            generalQueries.push(condition);
          } else if (
            pathType.instance === 'Array' &&
            (<any>pathType).caster.instance === 'String'
          ) {
            let condition = {};
            condition[path] = regexFilter;
            generalQueries.push(condition);
          }
        }
      }

      for (const key in filter) {
        if (key !== 'generalSearch') {
          let condition = {};
          if (Array.isArray(filter[key])) {
            condition[key] = { $in: filter[key] };
          } else {
            condition[key] = filter[key];
          }
          specificQueries.push(condition);
        }
      }

      let combinedQueries = [];

      if (generalQueries.length) {
        combinedQueries.push({ $or: generalQueries });
      }

      if (specificQueries.length) {
        combinedQueries = [...combinedQueries, ...specificQueries];
      }

      if (!combinedQueries.length) {
        throw new Error('No valid search criteria provided.');
      }

      const workshops = await this.workshopModel
        .find({ $and: combinedQueries })
        .exec();
      return {
        success: true,
        message: workshops,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async findOne(id: string): Promise<ResponseI> {
    try {
      const workshop = await this.workshopModel.findById(id).exec();
      if (!workshop) {
        return {
          success: false,
          message: 'Workshop not found!',
        };
      }
      return {
        success: true,
        message: workshop,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(id: string, updatedWorkshop: Workshop): Promise<ResponseI> {
    try {
      const workshop = await this.workshopModel
        .findByIdAndUpdate(id, updatedWorkshop, { new: true })
        .exec();
      if (!workshop) {
        return {
          success: false,
          message: 'Workshop not found!',
        };
      }
      return {
        success: true,
        message: workshop,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async delete(id: string): Promise<ResponseI> {
    try {
      const res = await this.workshopModel.findByIdAndRemove(id).exec();
      if (!res) {
        return {
          success: false,
          message: 'Workshop not found!',
        };
      }
      return {
        success: true,
        message: 'Workshop successfully deleted.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async subWorkshop(workshopId: string, userId: string) {
    try {
      await this.workshopModel.updateOne(
        { _id: workshopId },
        {
          $push: { watching: userId },
        },
      );

      return {
        success: true,
        message: 'Did sub',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async unsubWorkshop(workshopId: string, userId: string) {
    try {
      await this.workshopModel.updateOne(
        { _id: workshopId },
        {
          $pull: { watching: userId },
        },
      );

      return {
        success: true,
        message: 'Did sub',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
