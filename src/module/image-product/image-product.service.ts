import { Injectable } from '@nestjs/common';
import { imageProduct } from './entities/image-product.entity';
import { ImageProductRepository } from './image-product.responsitory';
// import { imgProductDto } from './dtos/imageproduct.dto';

@Injectable()
export class ImageProductService {
  constructor(private imageProductRepository: ImageProductRepository) {}
  async createImagesForProduct(
    productId: number,
    imageUrls: string[],
  ): Promise<imageProduct[]> {
    // console.log(imageUrls, 'imageUrls');
    const productImages = await Promise.all(
      imageUrls.map((imageUrl) =>
        this.imageProductRepository.create({
          src: imageUrl,
          productId: productId,
        }),
      ),
    );
    return productImages;
  }

  async findAll(): Promise<imageProduct[]> {
    return await this.imageProductRepository.findAll();
  }
  async updateImage(id: number, data: any): Promise<any> {
    if (data.src) {
      const updateResult = await this.imageProductRepository.update(id, data);
      if (updateResult.affected === 1) {
        return {
          data: data,
          message: 'Image updated successfully',
        };
      } else {
        throw new Error('No image was updated');
      }
    } else {
      throw new Error('No image data provided');
    }
  }

  async findImageById(id: number): Promise<imageProduct> {
    return await this.imageProductRepository.findImageById(id);
  }
}
