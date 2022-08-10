import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parent: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  badge: string;

  @Column()
  role: string;

  @Column()
  currency: string;

  @Column()
  bankAccount: string;

  @Column()
  bankName: string;

  @Column()
  share_percentage: number;
}
