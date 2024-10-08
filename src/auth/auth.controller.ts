import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from './enums/role.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
  user: {
    username: string;
    role: string;
  };
}

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (!user) throw new UnauthorizedException();

    return this.authService.login(user);
  }

  @Post('protected')
  @Auth(Role.ADMIN)
  getProtectedData(@Req() req: RequestWithUser) {
    return {
      message: 'Esta es la data protegida',
      user: req.user,
    };
  }
}
