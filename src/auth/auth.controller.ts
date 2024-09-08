import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/role.decorator';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getProtectedData(@Req() req: RequestWithUser) {
    return {
      message: 'Esta es la data protegida',
      user: req.user,
      role: req.user.role,
    };
  }
}
