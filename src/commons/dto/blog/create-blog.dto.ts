import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  id?: number;

  @IsString()
  @IsNotEmpty()
  judul: string;

  @IsString()
  @IsNotEmpty()
  konten: string;

  @IsString()
  @IsNotEmpty()
  tumbnail: string;

  @IsNotEmpty()
  user: number;
}
