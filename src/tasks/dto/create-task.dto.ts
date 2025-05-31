import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, { message: 'O nome task não pode conter apenas espaços' })
    taskName: string;

    @IsString()
    @IsNotEmpty()
    taskDescription: string;
}
