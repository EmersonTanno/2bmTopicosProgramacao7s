import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/enum/roles.enum";

@Schema()
export class User 
{
    @Prop({ required: true })
    name: string;
    
    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    roles: Role[]
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);