import { Injectable, NotFoundException } from '@nestjs/common';
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
    const userFound = this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (!userFound) throw new Error('El email ya fue registrado');
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  getUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async patchUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getUser(id);
    const result = Object.assign(user, updateUserDto);
    return this.userRepository.save(result);
  }

  async deleteUser(id: number) {
    const userFound = await this.getUser(id);
    if (!userFound) throw new NotFoundException();
    return this.userRepository.delete(id);
  }

  async getUserByUsername(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });

    if (!user) throw new NotFoundException('Usuario o contraseña incorrectos');

    return user;
  }
}
