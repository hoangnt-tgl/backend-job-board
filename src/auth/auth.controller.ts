import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './auth.dto';
import { Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Roles } from './roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from './guard/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('auth')
  @Post('login')
  async login(@Body() { email, password }: loginDto) {
    return this.authService.login({ email, password });
  }
  @Roles(Role.FREELANCER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile() {
    return 'profile';
  }
}
