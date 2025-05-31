import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";
import { TaskStatus } from "../enum/taskStatus.enum";

@Schema()
export class Task 
{
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: ObjectId;

    @Prop({required: true})
    taskName: string;

    @Prop({required: true})
    taskDescription: string;
 
    @Prop({required: true})
    taskStatus: TaskStatus;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);