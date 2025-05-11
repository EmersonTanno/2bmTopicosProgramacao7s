import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { RequestUserDto } from './dto/request-user.dto';

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

      if(users.length == 0){
        throw new NotFoundException('Nenhuma ocorrência encontrada');
      }

      const requestedUsers: RequestUserDto[] = users.map((o) => ({
        id: o.id,
        name: o.name,
      }));

      return requestedUsers;
    }catch (e){
      throw new BadRequestException(e.message);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
