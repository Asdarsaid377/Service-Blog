import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Currency } from 'src/commons/enum/currency.enum';
import { Role } from 'src/commons/enum/role.enum';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  displayName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(Role, {
    message: 'Invalid parameter role',
  })
  role: Role;

  @IsEnum(Currency, {
    message: 'Invalid paramter currency',
  })
  @IsOptional()
  currency: Currency;

  @IsString()
  @IsOptional()
  bankName: string;

  @IsString()
  @IsOptional()
  bankAccount: string;

  @IsNumber({}, { each: true })
  @IsOptional()
  id_games: number[];

  @IsNumber()
  @IsOptional()
  balance: number;

  @IsNumber()
  @IsOptional()
  share_percentage: number;

  @IsNumber()
  @IsOptional()
  parent: number;
}
