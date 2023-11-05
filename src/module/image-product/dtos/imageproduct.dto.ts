import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class imgProductDto {
  @IsString()
  @IsNotEmpty()
  src: string;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
