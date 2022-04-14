/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  productlist: string;

  @IsString()
  brand: string;

  @IsString()
  modal: string;
}