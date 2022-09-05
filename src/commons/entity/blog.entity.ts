import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Blog')
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  judul: string;

  @Column()
  konten: string;

  @Column()
  tumbnail: string;
}
