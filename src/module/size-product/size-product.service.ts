import { Injectable } from '@nestjs/common';
// import { ProductSize } from './entities/product-size.entity';
import { SizeProductRepository } from './size-product.repository';

@Injectable()
export class SizeProductService {
  constructor(private sizeProductRepository: SizeProductRepository) {}

  async create(productId: number, sizeArray: string[]): Promise<any> {
    const productSize = await Promise.all(
      sizeArray.map(async (size) => {
        await this.sizeProductRepository.create({
          sizeId: size,
          productId: productId,
        });
        console.log(size, productId);
      }),
    );
    return productSize;
  }
}
