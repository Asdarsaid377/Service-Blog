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
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../commons/dto/user/create.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditUserDTO } from 'src/commons/dto/user/edit.user.dto';

@UseGuards(JwtAuthGuard) // Membatasi User Untuk Mengakses Endpoint Yang Beradah dibawah JwtAuthGuard SebelumLogin
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async showAllUsers() {
    const users = await this.usersService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      data: users,
    };
  }

  @Get(':id')
  async readUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.usersService.read(id);
      return {
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return HttpStatus.NOT_FOUND;
    }
  }
  @Get('username/:username')
  async findUserByUsername(@Param('username') username: string) {
    try {
      const data = await this.usersService.findByUsername(username);
      return {
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw HttpStatus.NOT_FOUND;
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
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: Partial<EditUserDTO>,
  ) {
    await this.usersService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const user = await this.usersService.read(id);
    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }
    await this.usersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
