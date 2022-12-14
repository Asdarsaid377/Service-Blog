import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../commons/entity/user.entity';
import { CreateUserDTO } from '../commons/dto/user/create.user.dto';
import * as bcrypt from 'bcrypt';
import { EditUserDTO } from 'src/commons/dto/user/edit.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async showAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }
  
  async create(data: CreateUserDTO) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    const user = this.usersRepository.save(data);
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByUsername(username: string): Promise<any> {
    try {
      const data = await this.usersRepository.findOne({
        where: {
          username: username,
        },
      });
      return data;
    } catch (error) {}
  }

  async read(id: number) {
    try {
      const data = await this.usersRepository.findOne({
        where: {
          id: id,
        },
      });
      return data;
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  async update(id: number, data: Partial<EditUserDTO>) {
    if (data.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.password, salt);
      data.password = hash;
    }
    await this.usersRepository.update({ id }, data);
  }

  async destroy(id: number) {
    return await this.usersRepository.delete(id);
  }
}
