import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { Model, ObjectId } from 'mongoose';
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

  async update(id: string, userId: ObjectId, updateTaskDto: UpdateTaskDto) {
    try
    {
      const foundedTask = await this.taskModel.findById(id);

      if (!foundedTask) {
        throw new NotFoundException(`Task com id: ${id} não encontrado`);
      }

      if (foundedTask.userId != userId) {
        throw new UnauthorizedException(`Task com id: ${id} não pertence ao usuário com id: ${userId}`);
      }

      return await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {new: true});

    } catch(e)
    {
      if (e instanceof NotFoundException || e instanceof UnauthorizedException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string, userId: ObjectId) {
    try
    {
      const foundedTask = await this.taskModel.findById(id);

      if (!foundedTask) {
        throw new NotFoundException(`Task com id: ${id} não encontrado`);
      }

      if (foundedTask.userId != userId) {
        throw new UnauthorizedException(`Task com id: ${id} não pertence ao usuário com id: ${userId}`);
      }

      const deletedTask = await this.taskModel.findByIdAndDelete(id);

      if(!deletedTask){
        throw new NotFoundException(`Task com id: ${id} não encontrado`);
      }

      return;
    }catch(e)
    {
      if (e instanceof NotFoundException || e instanceof UnauthorizedException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  async findTasksByUser(userId: string) {
    try
    {
      const foundedTasks = await this.taskModel.find({userId : userId})

      return foundedTasks;
    }catch(e)
    {
      throw new BadRequestException(e.message);
    }
  }

  async updateTaskStatus(id: string, userId: ObjectId, newStatus: string) {
    try {
      const foundedTask = await this.taskModel.findById(id);

      if (!foundedTask) {
        throw new NotFoundException(`Task com id: ${id} não encontrado`);
      }

      if (foundedTask.userId != userId) {
        throw new UnauthorizedException(`Task com id: ${id} não pertence ao usuário com id: ${userId}`);
      }

      if(!Object.values(TaskStatus).includes(newStatus as TaskStatus))
      {
        throw new BadRequestException(`Status ${newStatus} não existe`);
      }

      return await this.taskModel.findByIdAndUpdate(
        id,
        { taskStatus: newStatus },
        { new: true } 
      );
    } catch (e) {
      if (e instanceof NotFoundException || e instanceof UnauthorizedException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }
}
