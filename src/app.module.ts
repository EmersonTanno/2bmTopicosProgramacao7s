import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/atidadeTopicos'), 
    UsersModule, 
    AuthModule, TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
