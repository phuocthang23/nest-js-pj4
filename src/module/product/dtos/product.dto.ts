import { IsNumber, IsString } from 'class-validator';
// import { imgProductDto } from 'src/module/image-product/dtos/imageproduct.dto';

export class productDto {
  @IsNumber()
  id: number;

  @IsString()
  nameProduct: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  status: number;

  @IsString({ each: true })
  images?: any[]; // Thêm một mảng chứa các DTO của ảnh sản phẩm

  size: any;
}
