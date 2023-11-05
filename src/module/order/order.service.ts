import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repositoty';
import { CartRepository } from './../cart/cart.repository';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
  ) {}

  async create(data: any) {
    const order = await this.orderRepository.create(data);
    // console.log(order.id, 'llllll');
    // console.log(order);

    const cart = await this.cartRepository.findCartByUserId(order.userId);
    // console.log(cart, '------');

    for (const item of cart) {
      await this.orderRepository.createOrderItem({
        quantity: item.quantity,
        sizeId: item.sizeId,
        productId: item.productId,
        userId: item.userId,
        orderId: order.id,
      });
      const productItem = await this.productRepository.findOneProductById(
        item.productId,
      );
      await this.productRepository.update(productItem.id, {
        stock: productItem.stock - item.quantity,
      });
      console.log();
    }

    return await this.cartRepository.deleteAllCartUser(Number(order.userId));
  }

  //get all
  async findAll() {
    return await this.orderRepository.findAll();
  }

  async updateStatus(item: number, id: any) {
    return await this.orderRepository.update(id, item);
  }
}
