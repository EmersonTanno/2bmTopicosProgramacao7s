import { ObjectId } from "mongoose";
import { Role } from "src/users/enum/roles.enum";

export class RequestUserDto {
    id: ObjectId;
    name: string;
    roles: Role[];
}