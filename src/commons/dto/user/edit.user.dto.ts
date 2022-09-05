import { IsEmail, IsString, Length } from 'class-validator';
export class EditUserDTO {
  @IsString()
  username?: string;
  @IsEmail()
  email?: string;

  @Length(8, 30)
  password?: string;
}
