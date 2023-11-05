import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class sizeDto {
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @IsNotEmpty()
  priceSize: number;
}
