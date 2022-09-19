import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class EditUserDTO {
  @IsNotEmpty({ message: "username can't be empty" })
  @IsString()
  username?: string;

  @IsNotEmpty({ message: "email can't be empty" })
  @IsEmail()
  email?: string;

  @IsString({ message: 'password must be string' })
  @Length(8, 30, { message: 'password must be between 8 and 30 characters' })
  password?: string;
}
