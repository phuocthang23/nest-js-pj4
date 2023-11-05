import { Injectable } from '@nestjs/common';
import { Product } from './enities/product.entity';
import { ProductRepository } from './product.repository';
import { productDto } from './dtos/product.dto';
import { ImageProductService } from '../image-product/image-product.service';
import { SizeProductService } from '../size-product/size-product.service';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private imageProductService: ImageProductService,
    private sizeProductService: SizeProductService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findProductById(id);
  }

  async create(data: productDto): Promise<any> {
    const createdProduct = await this.productRepository.create(data);

    const sizeArray = JSON.parse(data.size);
    console.log(sizeArray);

    // Upload hình ảnh cho sản phẩm
    if (data.images && data.images.length > 0) {
      await this.imageProductService.createImagesForProduct(
        createdProduct.id,
        data.images,
      );
    }

    if (sizeArray && sizeArray.length > 0) {
      await this.sizeProductService.create(createdProduct.id, sizeArray);
    }
    const result = {
      nameProduct: createdProduct.nameProduct,
      description: createdProduct.description,
      price: createdProduct.price,
      categoryId: createdProduct.categoryId,
      stock: createdProduct.stock,
      status: createdProduct.status,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };

    return result;
  }

  async update(id: number, data: Product): Promise<any> {
    const response = await this.productRepository.update(id, data);
    if (response) {
      return {
        message: 'Product updated successfully',
      };
    }
    return {
      message: 'Product updated failed',
    };
  }

  async delete(id: number): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
