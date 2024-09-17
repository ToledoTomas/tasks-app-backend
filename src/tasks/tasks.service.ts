import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UserService } from 'src/user/user.service';
import { TaskFilterDto } from 'src/common/dto/task-filters.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}

  async postTask(task: CreateTaskDto) {
    const user = await this.userService.getUser(task.userId);

    const taskToSave = this.taskRepository.create({
      title: task.title,
      description: task.description,
      status: task.status,
      user,
    });

    if (!task.userId) {
      throw new BadRequestException('El userId es requerido');
    }

    return await this.taskRepository.save(taskToSave);
  }

  async getTasks(filterDto: TaskFilterDto): Promise<Task[]> {
    const { status, sortDirection } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (sortDirection) {
      query.orderBy('task.createdAt', sortDirection);
    }

    const tasks = await query.getMany();

    return tasks;
  }

  getTask(id: number) {
    const task = this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) throw new NotFoundException();

    return task;
  }

  async patchTask(id: number, task: UpdateTaskDto) {
    const taskFound = await this.getTask(id);
    const result = Object.assign(taskFound, task);
    return this.taskRepository.save(result);
  }

  deleteTask(id: number) {
    const taskFound = this.getTask(id);

    if (!taskFound) throw new NotFoundException();

    return this.taskRepository.delete(id);
  }
}
