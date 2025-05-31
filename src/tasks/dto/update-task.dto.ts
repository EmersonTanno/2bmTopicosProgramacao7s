import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { TaskStatus } from '../enum/taskStatus.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, { message: 'O nome da task não pode conter apenas espaços' })
    taskName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, { message: 'A descrição da task não pode conter apenas espaços' })
    taskDescription?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    taskStatus?: TaskStatus;
}
