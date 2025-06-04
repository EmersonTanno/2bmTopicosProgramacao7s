import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enum/roles.enum';
import { User } from 'src/auth/decorators/user.decorator';
import { TaskStatus } from './enum/taskStatus.enum';
import { ObjectId } from 'mongoose';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  create(@Body() createTaskDto: CreateTaskDto, @User('sub') userId: string) {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @User('sub') userId: ObjectId) {
    return this.tasksService.update(id, userId, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Get('user/tasks')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  getByUser(@User('sub') userId: string) {
    return this.tasksService.findTasksByUser(userId);
  }

  @Put('updateStatus/:id/:status')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  updateTaskStatus(@Param('id') id: string, @Param('status') status: string, @User('sub') userId: ObjectId) {
    return this.tasksService.updateTaskStatus(id, userId, status);
  }
}
