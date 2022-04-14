/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentsDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNumber()
  @IsNotEmpty()
  phone: number;
}
