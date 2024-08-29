import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  postUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  getUsers() {
    return `This action returns all user`;
  }

  getUser(id: number) {
    return `This action returns a #${id} user`;
  }

  patchUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  deleteUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
