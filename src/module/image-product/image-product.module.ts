import { Module } from '@nestjs/common';
import { ImageProductController } from './image-product.controller';
import { ImageProductService } from './image-product.service';
import { imageProduct } from './entities/image-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageProductRepository } from './image-product.responsitory';
import { CloudinaryProvider } from 'src/shared/cloudinary/cloudinary.provider';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/shared/cloudinary/cloudinary.module';
import { DataFromToken } from 'src/shared/utils/dataFormToken';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([imageProduct, CloudinaryModule])],
  controllers: [ImageProductController],
  providers: [
    ImageProductService,
    ImageProductRepository,
    CloudinaryProvider,
    CloudinaryService,
    DataFromToken,
    AuthGuard,
  ],
})
export class ImageProductModule {}
