import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ResponseI } from 'src/models';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/createProject')
  async create(@Body() project: Project): Promise<ResponseI> {
    return await this.projectService.create(project);
  }

  @Get('/getAllProjects')
  async findAll(@Query() filter: any): Promise<ResponseI> {
    for (const key in filter) {
      if (typeof filter[key] === 'string') {
        filter[key] = [filter[key]];
      }
    }
    return await this.projectService.findAll(filter);
  }

  @Get('/getProjectById/:id')
  async findOne(@Param('id') id: string): Promise<ResponseI> {
    return await this.projectService.findOne(id);
  }

  @Post('/updateProject')
  async update(
    @Body('id') id: string,
    @Body('project') updatedProject: Project,
  ): Promise<ResponseI> {
    return await this.projectService.update(id, updatedProject);
  }

  @Post('/deleteProject')
  async delete(@Body('id') id: string): Promise<ResponseI> {
    return await this.projectService.delete(id);
  }

  @Post('/subProject')
  async sub(
    @Body('projectId') projectId: string,
    @Body('userId') userId,
  ): Promise<ResponseI> {
    return await this.projectService.subProject(projectId, userId);
  }

  @Post('/unsubProject')
  async unsub(
    @Body('projectId') projectId: string,
    @Body('userId') userId,
  ): Promise<ResponseI> {
    return await this.projectService.unsubProject(projectId, userId);
  }
}
