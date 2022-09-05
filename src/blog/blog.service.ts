import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from '../commons/entity/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from '../commons/dto/blog/create-blog.dto';
import { UpdateBlogDto } from '../commons/dto/blog/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    return await this.blogRepository.save(createBlogDto);
  }

  async findAll(): Promise<BlogEntity[]> {
    return await this.blogRepository.find();
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!blog) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'blog Not Found',
      };
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await this.blogRepository.update(id, updateBlogDto);
  }

  async remove(id: number) {
    return await this.blogRepository.delete(id);
  }
}
