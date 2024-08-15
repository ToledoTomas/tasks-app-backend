import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  postTask(task: CreateTaskDto) {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  getTasks() {
    return this.taskRepository.find();
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
