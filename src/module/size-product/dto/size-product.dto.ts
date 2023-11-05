import { IsNumber } from 'class-validator';

export class ProductSizeDto {
  @IsNumber()
  sizeId: number;

  @IsNumber()
  productId: number;
}
