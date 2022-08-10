import { IsNotEmpty, IsNumber } from "class-validator"

export class ItemsDTO {
  id?: number;

  @IsNotEmpty()
  kode_barang: string;

  @IsNotEmpty()
  nama_barang: string;

  @IsNotEmpty()
  jenis_barang: string;

  @IsNotEmpty()
  @IsNumber()
  harga: number

  @IsNotEmpty()
  @IsNumber()
  stock_barang: number;
}