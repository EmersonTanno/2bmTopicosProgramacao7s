import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, Matches } from 'class-validator';
import { Role } from 'src/users/enum/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    @Matches(/\S/, { message: 'O novo nome não pode conter apenas espaços' })
    name: string;

    @IsString()
    @IsOptional()
    @Matches(/\S/, { message: 'A nova senha não pode conter apenas espaços' })
    password: string;

    @IsString()
    @IsOptional()
    roles: Role[];
}
