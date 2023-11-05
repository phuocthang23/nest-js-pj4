import { Module } from '@nestjs/common';
import { SizeProductController } from './size-product.controller';
import { SizeProductService } from './size-product.service';
import { ProductSize } from './entities/product-size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeProductRepository } from './size-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize])],
  controllers: [SizeProductController],
  providers: [SizeProductService, SizeProductRepository],
})
export class SizeProductModule {}
