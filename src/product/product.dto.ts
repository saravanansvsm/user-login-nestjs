/* eslint-disable prettier/prettier */
import { IsString, IsNumber, MinLength, Min, IsDefined } from 'class-validator';

export class SelectProductDto {


  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(4, { always: true })
  name: string;

  @IsDefined({ always: true})
  @IsString({ always: true})
  code: string;

  @IsDefined({ always: true})
  @IsString({ always: true})
  @MinLength(3, { always: true})
  modal: string;

  @IsNumber()
  @Min(0, {always: true})
  price: number;
  //car: any;
  
}
