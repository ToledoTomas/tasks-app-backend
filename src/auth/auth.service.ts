import { UserService } from 'src/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserAndPass(username, password);
    if (!user) {
      throw new NotFoundException('Usuario o contraseña incorrectos');
    }
    console.log('Usuario validado:', user);
    return user;
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token,
      user,
    };
  }
}
