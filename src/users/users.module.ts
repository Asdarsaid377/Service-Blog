import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../commons/entity/user.entity';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const options: JwtModuleOptions = {
          privateKey: config.get('privateKey'),
          publicKey: config.get('publicKey'),
          signOptions: {
            expiresIn: config.get('TOKEN_EXPIRATION'),
            issuer: config.get('TOKEN_ISSUER'),
            algorithm: 'RS256',
          },
        };
        return options;
      },
    }),
  ], // Entity Yang Digunakan
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
