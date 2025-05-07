import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}


  async create(createUserDto: CreateUserDto) {
    try{
      const existingUser = await this.userModel.findOne({name: createUserDto.name});
      if(existingUser)
      {
        throw new Error(`Já existe um usuário com o nome ${createUserDto.name}`);
      }

      const user = new this.userModel(createUserDto);
      return await user.save();
    } catch (e){
      throw new BadRequestException(e.message)
    }
  }

  async findAll() {
    try{
      const users = await this.userModel.find();
      return users;
    }catch (e){
      throw new BadRequestException(e.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
