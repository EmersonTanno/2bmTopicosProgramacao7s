import { BadRequestException, Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, ObjectId } from 'mongoose';
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
        email: 'kannon@gmail.com',
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

      user.save();

      return;
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
        email: o.email,
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

  async findOne(id: string, userId: ObjectId, roles: Role[]) {
    try
    {

      if(!roles.includes(Role.ADMIN) && id != String(userId))
      {
        throw new UnauthorizedException("Você não possui acesso a outro usuários");
      }

      const user = await this.userModel.findById(id);

      if(!user){
        throw new NotFoundException(`Nenhum usuário encontrado com id: ${id}`);
      }

      const requestedUsers: RequestUserDto = { 
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      }

      return requestedUsers;
    } catch (e){
      if (e instanceof NotFoundException || e instanceof UnauthorizedException) {
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

      if (!updatedUser) {
        throw new NotFoundException(`Erro ao atualizar: usuário com id ${id} não encontrado`);
      }

      const requestedUsers: RequestUserDto = { 
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        roles: updatedUser.roles,
      }
      return requestedUsers;
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
