import { IsNotEmpty, IsString, Matches } from "class-validator";
import { Role } from "src/enum/roles.enum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, { message: 'A nova senha não pode conter apenas espaços' })
    password: string;

    @IsNotEmpty()
    roles: Role[];

}
