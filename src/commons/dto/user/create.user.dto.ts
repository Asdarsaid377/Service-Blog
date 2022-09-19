import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  id?: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Harus Berformat Email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  password: string;
}
