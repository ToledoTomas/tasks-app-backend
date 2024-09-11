import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUserAndPass(username, password);
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token,
      user,
    };
  }
}
