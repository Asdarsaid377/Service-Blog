import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

import * as bcrypt from 'bcrypt';
import {
  PayloadUserAdminInterface,
  PayloadUserAgenInterface,
  PayloadUserPlayerInterface,
} from 'src/commons/interfaces/payload-user.interface';
import { loginResponse } from 'src/commons/responses/login.response';
import { Role } from 'src/commons/enum/role.enum';
import { UsersEntity } from 'src/commons/entity/user.entity';
import { LoginErrorException } from 'src/commons/exceptions/login-error-exception';
import { TokenLoginResponseInterface } from 'src/commons/interfaces/token-response.interface';
import { chargePayload } from 'src/commons/utils/charge-payload.util';

@Injectable()
export class AuthService {
  private readonly loggerAuth: Logger = new Logger(AuthService.name);

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) return false;

    const match = await bcrypt.compareSync(password, user.password);
    if (!match) return false;
    return user;
  }

  chargePayload(user: UsersEntity): TokenLoginResponseInterface {
    const payload = chargePayload(user);
    if (!payload) {
      this.loggerAuth.error('Invalid role');
      throw new LoginErrorException('Invalid role');
    }
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      name: user.username,
      sub: user.parent,
    };
    const token = this.jwtService.sign(payload);
    return { acces_token: token };
  }

  // async logout(user: any) {
  //   const payload: PayloadUserInterface = {
  //     username: user.username,
  //     email: user.email,
  //     sub: user.id,
  //   };
  //   const token = this.jwtService.sign(payload);
  //   // const encode = Base64.encode(JSON.stringify(token))
  //   return { acces_token: null };
  // }
}
