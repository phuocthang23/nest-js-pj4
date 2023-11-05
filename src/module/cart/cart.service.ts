import { Injectable } from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
import { CartRepository } from './cart.repository';
// import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async addToCarts(data: CartDto): Promise<any> {
    const userCart = await this.cartRepository.findUserCart(
      data.userId,
      data.productId,
      data.sizeId,
    );

    if (userCart) {
      return await this.cartRepository.update(userCart.id, {
        quantity: userCart.quantity + data.quantity,
      });
    } else {
      return await this.cartRepository.create({
        userId: data.userId,
        productId: data.productId,
        sizeId: data.sizeId,
        quantity: data.quantity,
      });
    }
  }

  async getCart(id: number): Promise<any> {
    console.log(id, '----------');
    return await this.cartRepository.findCartByUserId(id);
  }

  async getAll(): Promise<any> {
    return await this.cartRepository.findAll();
  }

  //delete buy userid
  async deleteByUserId(id: number): Promise<any> {
    return await this.cartRepository.deleteByUserId(id);
  }
}
