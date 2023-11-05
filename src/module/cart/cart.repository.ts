import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartDto } from './dto/cart.dto';
import { Product } from '../product/enities/product.entity';
// import { CreateUserDto } from './dtos/CreateUser.dto';

export class CartRepository {
  constructor(
    @InjectRepository(Cart) private rep: Repository<Cart>,
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}

  async create(data: CartDto) {
    return await this.rep.save(data);
  }

  async findUserCart(id: number, productId: number, sizeId: number) {
    return await this.rep.findOne({
      where: {
        userId: id,
        productId: productId,
        sizeId: sizeId,
      },
    });
  }

  async update(id: number, data: any) {
    return await this.rep.update(id, data);
  }
  //   find all
  async findAll(): Promise<CartDto[]> {
    return this.rep.find({ relations: ['product'] });
  }

  //   async update(id: number, data: CartDto) {
  //     return await this.rep.update(id, data);
  //   }

  //find user by id
  async findCartByUserId(id: number): Promise<CartDto[]> {
    return await this.rep.find({
      where: { userId: id },
      relations: ['product', 'size'],
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
