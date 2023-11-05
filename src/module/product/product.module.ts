import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './enities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/shared/cloudinary/cloudinary.provider';
import { ImageProductService } from '../image-product/image-product.service';
import { ImageProductRepository } from '../image-product/image-product.responsitory';
import { imageProduct } from '../image-product/entities/image-product.entity';
import { ImageProductModule } from '../image-product/image-product.module';
import { SizeProductRepository } from '../size-product/size-product.repository';
import { ProductSize } from '../size-product/entities/product-size.entity';
import { SizeProductModule } from '../size-product/size-product.module';
import { SizeProductService } from '../size-product/size-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, imageProduct, ProductSize]),

    ImageProductModule,
    SizeProductModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    CloudinaryService,
    CloudinaryProvider,
    ImageProductService,
    ImageProductRepository,
    SizeProductRepository,
    SizeProductService,
  ],
})
export class ProductModule {}
