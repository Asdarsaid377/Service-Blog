import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../commons/entity/user.entity';
import { CreateUserDTO } from '../commons/dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/commons/dto/login.user.dto';
import { LoginErrorException } from 'src/commons/exceptions/login-error-exception';
import { Role } from 'src/commons/enum/role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private readonly loggerUser: Logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  /**
   * Function untuk login user dashboard
   * @param data LoginUserDto
   * @returns Promise<TokenLoginResponseInterface> Mengembalikan User dan atau false
   */
  async validateLoginUserDashboard(
    data: LoginUserDto,
  ): Promise<UsersEntity | false> {
    const user = await this.usersRepository.findOne({
      where: {
        username: data.username,
      },
    });

    if (!user) return false;
    if (user.role === Role.Player)
      throw new LoginErrorException({
        status: 'failed',
        message: `You haven't access`,
      });

    const match = await bcrypt.compareSync(data.password, user.password);
    if (!match) return false;

    this.loggerUser.log(`User ${user.username}[${user.role}]  logged in`);
    return user;
  }

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

  async findByUsername(username: string): Promise<UsersEntity | null> {
    try {
      const data = await this.usersRepository.findOne({
        where: {
          username: username,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  }

  async read(id: number) {
    return await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, data: Partial<CreateUserDTO>) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    await this.usersRepository.update({ id }, data);
  }

  async destroy(id: number) {
    return await this.usersRepository.delete(id);
  }

  /**
   *
   * @param payload object dari user yg berhasil login  
   * @returns mengembalikan token yg di generate oleh JWT
   */
  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  /*
    * @param payload object dari user yg berhasil login     
    * @returns mengembalikan token yg di generate oleh JWT 
    * 
    * 
    * */
  login(user: UsersEntity) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.generateAccessToken(payload),
    };
  }

}
