import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/commons/dto/create.user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/commons/dto/login.user.dto';
import { LoginErrorException } from 'src/commons/exceptions/login-error-exception';
import { TokenLoginResponseInterface } from 'src/commons/interfaces/token-response.interface';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Endpoint Login!' })
  @ApiBody({
    description: 'Endpoint ini untuk mendapatkan Response Token dari JWT',
    schema: { default: { username: '', password: '' } },
  })
  async login(
    @Body() data: LoginUserDto,
  ): Promise<TokenLoginResponseInterface> {
    const user = await this.authService.validateUser(
      data.username,
      data.password,
    );
    if (!user)
      throw new LoginErrorException({
        message: 'Username atau password salah',
      });
    return this.authService.chargePayload(user);
  }

  @Post('/register')
  async createUsers(@Body() data: CreateUserDTO) {
    // const user = await this.usersService.create(data);
    // return {
    //   statusCode: HttpStatus.OK,
    //   message: 'User created successfully',
    //   user,
    // };
  }
}
