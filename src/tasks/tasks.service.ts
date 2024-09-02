import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}

  async postTask(task: CreateTaskDto) {
    const userFound = await this.userService.getUser(task.userId);

    if (!userFound) throw new NotFoundException();

    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  getTasks() {
    return this.taskRepository.find({
      relations: ['user'],
    });
  }

  getTask(id: number) {
    return this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  async patchTask(id: number, task: UpdateTaskDto) {
    const taskFound = await this.taskRepository.findOne({
      where: {
        id,
      },
    });
    const result = Object.assign(taskFound, task);
    return this.taskRepository.save(result);
  }

  deleteTask(id: number) {
    return this.taskRepository.delete(id);
  }
}
