import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Project } from './project.model';
import { ResponseI } from 'src/models';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: ReturnModelType<typeof Project>,
  ) {}

  async create(project: Project): Promise<ResponseI> {
    try {
      const newProject = new this.projectModel(project);
      await newProject.save();
      return {
        success: true,
        message: newProject,
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

        for (let path in this.projectModel.schema.paths) {
          const pathType = this.projectModel.schema.paths[path];

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

      const projects = await this.projectModel
        .find({ $and: combinedQueries })
        .exec();
      return {
        success: true,
        message: projects,
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
      const project = await this.projectModel.findById(id).exec();
      if (!project) {
        return {
          success: false,
          message: 'Project not found!',
        };
      }
      return {
        success: true,
        message: project,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(id: string, updatedProject: Project): Promise<ResponseI> {
    try {
      const project = await this.projectModel
        .findByIdAndUpdate(id, updatedProject, { new: true })
        .exec();
      if (!project) {
        return {
          success: false,
          message: 'Project not found!',
        };
      }
      return {
        success: true,
        message: project,
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
      const res = await this.projectModel.findByIdAndRemove(id).exec();
      if (!res) {
        return {
          success: false,
          message: 'Project not found!',
        };
      }
      return {
        success: true,
        message: 'Project successfully deleted.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async subProject(projectId: string, userId: string) {
    try {
      await this.projectModel.updateOne(
        { _id: projectId },
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

  async unsubProject(projectId: string, userId: string) {
    try {
      await this.projectModel.updateOne(
        { _id: projectId },
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
