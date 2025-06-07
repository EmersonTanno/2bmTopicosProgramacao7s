import {  IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { Role } from "src/users/enum/roles.enum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, { message: 'O usuário não pode conter apenas espaços' })
    name: string;

    @IsEmail({}, { message: 'E-mail inválido' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, { message: 'A senha não pode conter apenas espaços' })
    password: string;

    @IsNotEmpty()
    roles: Role[];

}
