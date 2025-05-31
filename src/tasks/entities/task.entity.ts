import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { TaskStatus } from "../enum/taskStatus.enum";

@Schema()
export class Task 
{
    @Prop({required: true})
    userId: ObjectId;

    @Prop({required: true})
    taskName: string;

    @Prop({required: true})
    taskStatus: TaskStatus;

    @Prop({required: true})
    taskDescription: string;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);