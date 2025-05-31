import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      
      return foundedTasks
    } catch(e)
    {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string) {
    try
    {
      const foundedTask = await this.taskModel.findById(id);

      if(!foundedTask){
        throw new NotFoundException(`Task com id: ${id} não encontrado`);
      }

      return foundedTask;
    }catch(e)
    {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try
    {
      const foundedTask = await this.taskModel.findById(id);

      if(!foundedTask){
        throw new NotFoundException(`Task com id: ${id} não encontrado`);
      }

      return await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {new: true});

    } catch(e)
    {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string) {
    try
    {
      const deletedTask = await this.taskModel.findByIdAndDelete(id);

      if(!deletedTask){
        throw new NotFoundException(`Task com id: ${id} não encontrado`);
      }

      return;
    }catch(e)
    {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  async findTasksByUser(id: string) {
    try
    {
      const foundedTasks = await this.taskModel.find({userId : id})

      return foundedTasks;
    }catch(e)
    {
      throw new BadRequestException(e.message);
    }
  }
}
