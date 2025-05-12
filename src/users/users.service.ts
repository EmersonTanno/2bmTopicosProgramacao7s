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
        throw new NotFoundException('Nenhuma usuário encontrado');
      }

      const requestedUsers: RequestUserDto[] = users.map((o) => ({
        id: o.id,
        name: o.name,
      }));

      return requestedUsers;
    }catch (e){
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: number) {
    try
    {
      const user = await this.userModel.findById(id);

      if(!user){
        throw new NotFoundException(`Nenhum usuário encontrado com id: ${id}`);
      }
      return user;
    } catch (e){
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  async findOneByName(name: string) {
    try
    {
      const user = await this.userModel.findOne({name});

      if(!user){
        throw new NotFoundException(`Nenhum usuário encontrado com name: ${name}`);
      }

      return user;
    } catch (e){
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
