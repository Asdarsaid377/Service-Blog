import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from '../commons/dto/login.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return false;
    }
    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      return null;
    }
    return user;
  }

  async login(login: LoginUser) {
    const payload = {
      username: login.username,
      sub: login.password,
      email: login.email,
    };
    const token = this.jwtService.sign(payload);
    return { acces_token: token };
  }

  async logout(user: any) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };
    let token = this.jwtService.sign(payload);
    return (token = null);
  }
}
