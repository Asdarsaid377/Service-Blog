import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './commons/entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import rsaconfig from './config/configuration';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [rsaconfig],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          privateKey: configService.get('privateKey'),
          publicKey: configService.get('publicKey'),
          signOptions: {
            expiresIn: configService.get('TOKEN_EXPIRATION'),
            issuer: configService.get('TOKEN_ISSUER'),
            algorithm: 'RS256',
          },
        };
        return options;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
