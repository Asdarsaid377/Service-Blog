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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../commons/dto/create.user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
}
