import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './commons/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { BlogEntity } from './commons/entity/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT), // default 3306
      username: 'root', // username database
      password: 'root', // password
      database: 'Blog', // nama database
      synchronize: true, // true jika ingin menambahkan table baru secara otomatis
      autoLoadEntities: true, // true jika ingin menambahkan entity baru secara otomatis
      entities: [UsersEntity, BlogEntity], //Table Yang digunakan pada database
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
