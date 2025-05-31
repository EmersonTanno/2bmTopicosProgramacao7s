import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { RequestUserDto } from './dto/request-user.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Role } from 'src/users/enum/roles.enum';
import { Console } from 'console';
dotenv.config();

@Injectable()
export class UsersService implements OnModuleInit{

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const existingAdmin = await this.userModel.findOne({ roles: Role.ADMIN });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = new this.userModel({
        name: 'Kannon',
        password: hashedPassword,
        roles: [Role.ADMIN],
      });

      await adminUser.save();
      console.log('Usuário admin padrão criado: Kannon / admin123');
    }
  }


  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userModel.findOne({ name: createUserDto.name });
      if (existingUser) {
        throw new Error(`Já existe um usuário com o nome ${createUserDto.name}`);
      }

      const saltOrRounds =  parseInt(process.env.SALTORROUNDS || "10");

      const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      return await user.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    try{
      const users = await this.userModel.find();

      const requestedUsers: RequestUserDto[] = users.map((o) => ({
        id: o.id,
        name: o.name,
        roles: o.roles,
      }));

      return requestedUsers;
    }catch (e){
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string) {
    try
    {
      const user = await this.userModel.findById(id);

      if(!user){
        throw new NotFoundException(`Nenhum usuário encontrado com id: ${id}`);
      }

      const requestedUsers: RequestUserDto = { 
        id: user.id,
        name: user.name,
        roles: user.roles,
      }

      return requestedUsers;
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findedUser = await this.userModel.findById(id);
      if (!findedUser) {
        throw new NotFoundException(`Usuário com id ${id} não encontrado`);
      }

      if (updateUserDto.name) {
        const existingUser = await this.userModel.findOne({ name: updateUserDto.name });
        if (existingUser && existingUser.id !== id) {
          throw new Error(`Já existe um usuário com o nome ${updateUserDto.name}`);
        }
      }

      if (updateUserDto.password != null) {
        const saltOrRounds = parseInt(process.env.SALTORROUNDS || "10");
        const hashedPassword = await bcrypt.hash(updateUserDto.password, saltOrRounds);
        updateUserDto.password = hashedPassword;
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
      return updatedUser;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }


  async remove(id: string) {
    try {
      const deletedUser = await this.userModel.findOneAndDelete({ _id: id });

      if (!deletedUser) {
        throw new NotFoundException(`Usuário com id ${id} não encontrado`);
      }

      return;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException(e.message);
    }
  }

}
