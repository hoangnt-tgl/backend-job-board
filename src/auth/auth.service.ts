import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { loginDto } from './auth.dto';
import { User } from '../user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: loginDto) {
    const user = await this.validateUser(loginDto);
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async validateUserById(id: number): Promise<User> {
    const user = this.userService.findOneById(id);
    return user;
  }
  //   validateAdminById(id: number): Promise<any> {
  //     throw new Error('Method not implemented.');
  //   }

  async validateUser(loginDto: loginDto): Promise<User> {
    const { email, password } = loginDto;

    const user = await this.userService.findOneByEmail(email);
    const compare = this.userService.comparePassword(password, user.password);
    if (!compare) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
