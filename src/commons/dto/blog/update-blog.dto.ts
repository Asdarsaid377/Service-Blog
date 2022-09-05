import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsString } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsString()
  judul?: string;

  @IsString()
  konten?: string;

  @IsString()
  tumbnail?: string;
}
