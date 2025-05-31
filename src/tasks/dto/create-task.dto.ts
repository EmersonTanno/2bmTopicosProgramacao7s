import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, { message: 'O nome da task não pode conter apenas espaços' })
    taskName: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, { message: 'A descrição da task não pode conter apenas espaços' })
    taskDescription: string;
}
