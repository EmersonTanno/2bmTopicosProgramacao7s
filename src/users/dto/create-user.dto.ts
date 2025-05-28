import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/enum/roles.enum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    roles: Role[];

}
