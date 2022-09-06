import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from './user.entity';

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

  @JoinColumn()
  @OneToOne(() => UsersEntity, (user) => user.id)
  user: number;
}
