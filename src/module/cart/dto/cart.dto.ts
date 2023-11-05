import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  sizeId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
