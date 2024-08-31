import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  postUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  getUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  patchUser(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });
    const result = Object.assign(user, updateUserDto);
    return this.userRepository.save(result);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
