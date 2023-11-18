import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(private wishlistRepository: WishlistRepository) {}

  async addToWishList(data: any, userIdFromToken: any): Promise<any> {
    const userCart = await this.wishlistRepository.findUserWishList(
      userIdFromToken,
      data.productId,
      // data.sizeId,
    );

    if (userCart) {
      return { message: 'Product already in wishlist' };
    } else {
      return await this.wishlistRepository.create({
        userId: userIdFromToken,
        productId: data.productId,
        // sizeId: data.sizeId,
      });
    }
  }

  async getWishListUser(id: number): Promise<any> {
    console.log(id);
    return await this.wishlistRepository.findWishListByUserId(id);
  }

  async getAll(): Promise<any> {
    return await this.wishlistRepository.findAll();
  }

  //delete buy userid
  async deleteByUserId(id: number): Promise<any> {
    return await this.wishlistRepository.deleteByUserId(id);
  }
}
