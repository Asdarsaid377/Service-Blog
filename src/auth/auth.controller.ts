import { Body, Controller, Delete, Get, HttpStatus, Post, Request } from '@nestjs/common';
import { CreateUserDTO } from 'src/commons/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService, private usersService: UsersService) { }

  @Post('/login')
  async login(@Request() req): Promise<any> {
    let user = await this.authService.validateUser(req.body.username, req.body.password);
    if (!user) {
      return { username: "Username atau password salah" };
    }
    return this.authService.login(user) // Harus mengembalikan jwt  accest  token untuk mengakses endpoint yang lain 
  }

  @Post('/register')
  async createUsers(@Body() data: CreateUserDTO) {
    const user = await this.usersService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user
    };
  }

}
