import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'pass123',
      username: 'postgres',
      database: 'todo_list',
      entities: [Task, User],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    TasksModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
