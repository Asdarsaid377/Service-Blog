import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("items")
export class ItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kode_barang: string;

  @Column()
  nama_barang: string;

  @Column()
  jenis_barang: string;

  @Column()
  harga: number;

  @Column()
  stock_barang: number;

}