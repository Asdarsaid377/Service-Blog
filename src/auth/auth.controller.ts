import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/commons/dto/user/create.user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/login')
  async login(
    @Response({ passthrough: true }) response,
    @Request() req,
  ): Promise<any> {
    try {
      let user = await this.authService.validateUser(
        req.body.username,
        req.body.password,
      );
      if (!user) {
        return { message: 'Username atau password salah' };
      }
      let token = await this.authService.login(user);
      response.cookie('acces_token', token.acces_token);
      return this.authService.login(user);
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  @Post('/register')
  async createUsers(@Body() data: CreateUserDTO) {
    const user = await this.usersService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }

  @Post('/logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }
}
