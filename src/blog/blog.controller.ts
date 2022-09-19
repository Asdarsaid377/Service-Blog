import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from '../commons/dto/blog/create-blog.dto';
import { UpdateBlogDto } from '../commons/dto/blog/update-blog.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const blog = this.blogService.findOne(+id);
    if (!blog) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'blog not found',
      };
    }
    return blog;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    const blog = this.blogService.findOne(+id);
    if (!blog) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'blog not found',
      };
    }
    const update = this.blogService.update(+id, updateBlogDto);
    return {
      message: `blog with id ${id} updated`,
      update: update,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const blog = this.blogService.findOne(+id);
    if (!blog) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'blog not found',
      };
    }
    return this.blogService.remove(+id);
  }
}
