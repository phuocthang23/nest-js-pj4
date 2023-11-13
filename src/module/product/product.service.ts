import { Injectable } from '@nestjs/common';
import { Product } from './enities/product.entity';
import { ProductRepository } from './product.repository';
// import { productDto } from './dtos/product.dto';
import { ImageProductService } from '../image-product/image-product.service';
import { SizeProductService } from '../size-product/size-product.service';
import { ISearch } from 'src/shared/utils/types';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private imageProductService: ImageProductService,
    private sizeProductService: SizeProductService,
  ) {}

  async findAll(data: ISearch): Promise<Product[]> {
    return await this.productRepository.findAll(data);
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findProductById(id);
  }

  async create(req: any): Promise<any> {
    const data = {
      nameProduct: req.nameProduct,
      categoryId: req.categoryId,
      price: +req.price,
      stock: +req.stock,
      description: req.description,
    };

    const createdProduct = await this.productRepository.create(data);

    const sizeArray = JSON.parse(req.size);

    // Upload hình ảnh cho sản phẩm
    if (req.images && req.images.length > 0) {
      await this.imageProductService.createImagesForProduct(
        createdProduct.id,
        req.images,
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
        susses: true,
        message: 'Product updated successfully',
      };
    }
    return {
      susses: false,
      message: 'Product updated failed',
    };
  }

  async delete(id: number): Promise<any> {
    const findProductById = await this.productRepository.findOneProductById(id);
    if (!findProductById) {
      throw new Error('Product not found');
    }
    const changeStatus = findProductById.status === 0 ? 1 : 0;
    const response = await this.productRepository.update(id, {
      status: changeStatus,
    });
    if (response.affected === 1) {
      return changeStatus === 1
        ? 'User has been blocked'
        : 'Block operation did not work';
    } else {
      throw new Error('Error updating user status');
    }

    // return await this.productRepository.delete(id);
  }

  async findProductByCategory(id: number): Promise<Product[]> {
    return await this.productRepository.findProductByCategory(id);
  }

  // async searchProduct(query: any): Promise<any> {
  //   return await this.productRepository.searchProduct(query);
  // }
}
