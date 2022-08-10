import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  Post,
  HttpCode,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../commons/dto/create.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginUserDto } from 'src/commons/dto/login.user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginErrorException } from 'src/commons/exceptions/login-error-exception';
import { chargePayload } from 'src/commons/utils/charge-payload.util';
import { loginDashboardResponse } from 'src/commons/responses/login.response';
import { Public } from 'src/commons/decorators/public.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Membatasi User Untuk Mengakses Endpoint Yang Beradah dibawah JwtAuthGuard SebelumLogin
@ApiTags('Users')
@Controller('users')
export class UsersController {
  private logger: Logger = new Logger(UsersController.name);
  constructor(private usersService: UsersService) {}

  @Get()
  async showAllUsers() {
    const users = await this.usersService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @Get(':id')
  async readUser(@Param('id') id: number) {
    try {
      const data = await this.usersService.read(id);
      return {
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  @Get('username/:username')
  async findUserByUsername(@Param('username') username: string) {
    try {
      const data = await this.usersService.findByUsername(username);
      return {
        data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    const user = await this.usersService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user,
    };
  }

  //Dapat data berdasarkan id

  //edit data
  @Patch(':id')
  async uppdateUser(
    @Param('id') id: number,
    @Body() data: Partial<CreateUserDTO>,
  ) {
    await this.usersService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data,
    };
  }

  //Delete data berdasarkan id
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      const user = await this.usersService.read(id);
      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Id User Not Found',
        };
      }
      await this.usersService.destroy(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {}
  }

  /**
   * @param data  : {username:string,password:string}
   * @returns { status: boolean,token:string,role: string}
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginDashboard(@Body() data: LoginUserDto) {
    let user = await this.usersService.validateLoginUserDashboard(data);
    if (!user) throw new LoginErrorException('User not found');

    let payload = chargePayload(user);
    if (!payload) throw new LoginErrorException('Role user tidak diketahui');
    let token = await this.usersService.generateAccessToken(payload);
    return loginDashboardResponse(user, token);
  }
}
