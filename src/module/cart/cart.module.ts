import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './cart.repository';
import { Product } from '../product/enities/product.entity';
import { DataFromToken } from 'src/shared/utils/dataFormToken';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product])],
  controllers: [CartController],
  providers: [CartService, CartRepository, DataFromToken],
})
export class CartModule {}
