import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { wishList } from './entities/wishlist.entity';
// import { CreateUserDto } from './dtos/CreateUser.dto';

export class WishlistRepository {
  constructor(@InjectRepository(wishList) private rep: Repository<wishList>) {}
  s;

  async create(data: any) {
    return await this.rep.save(data);
  }

  async findUserWishList(id: number, productId: number) {
    return await this.rep.findOne({
      where: {
        userId: id,
        productId: productId,
      },
    });
  }

  async update(id: number, data: any) {
    return await this.rep.update(id, data);
  }
  //   find all
  async findAll(): Promise<any[]> {
    return this.rep.find({ relations: ['product'] });
  }

  //   async update(id: number, data: CartDto) {
  //     return await this.rep.update(id, data);
  //   }

  //find user by id
  async findCartByUserId(id: number): Promise<any[]> {
    return await this.rep.find({
      where: { userId: id },
      relations: ['product'],
    });
  }

  //deleteByUserId
  async deleteByUserId(id: number) {
    return await this.rep.delete({ id });
  }

  async deleteAllCartUser(id: number) {
    return await this.rep.delete({ userId: id });
  }
}
