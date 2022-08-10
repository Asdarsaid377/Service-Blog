import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './commons/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '116.0.5.202',
      port: 40001, // default 3306
      username: 'gateway', // username database
      password: 'ondeonde-gateway', // password
      database: 'User', // nama database
      synchronize: false, // true jika ingin menambahkan table baru secara otomatis
      // "logging": true, // menampilkan log pada console
      entities: [UsersEntity], //Table Yang digunakan pada database
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
