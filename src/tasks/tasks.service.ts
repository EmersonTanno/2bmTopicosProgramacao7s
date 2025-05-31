import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { Model } from 'mongoose';
import { TaskStatus } from './enum/taskStatus.enum';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>
  ){}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    try 
    {
      const newTask = new this.taskModel({
        ...createTaskDto,
        userId,
        taskStatus: TaskStatus.BACKLOG,
      });

      return await newTask.save();
    } catch (e) 
    {
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    try
    {
      const foundedTasks = await this.taskModel.find();

      if(foundedTasks.length == 0)
      {
        return "Ainda não existem task"
      }

      return foundedTasks
    } catch(e)
    {
      throw new BadRequestException(e.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
