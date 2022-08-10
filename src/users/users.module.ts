import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../commons/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])], // Entity Yang Digunakan
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
