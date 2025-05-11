import { ObjectId } from "mongoose";

export class RequestUserDto {
    id: ObjectId;
    name: string;
}