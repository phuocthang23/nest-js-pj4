import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';
import { OrderItem } from '../order-item/entities/orderItem.entity';
// import { CreateUserDto } from './dtos/CreateUser.dto';

export class OrderRepository {
  constructor(
    @InjectRepository(Order) private rep: Repository<Order>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
  ) {}

  async create(data: any) {
    return await this.rep.save(data);
  }

  async createOrderItem(data: any) {
    return await this.orderItemRepo.save(data);
  }

  async findAll() {
    return await this.rep.find({ relations: ['orderItems'] });
  }

  //update
  async update(id: any, status: any) {
    console.log(status);
    return await this.rep.update(id, status);
  }
  //   async findUserCart() {}

  //   async update(id: number, data: any) {
  //     return await this.rep.update(id, data);
  //   }
  //   //   find all
  //   async findAll(): Promise<CartDto[]> {
  //     return this.rep.find({ relations: ['product'] });
  //   }

  //   //   async update(id: number, data: CartDto) {
  //   //     return await this.rep.update(id, data);
  //   //   }

  //   //find user by id
  //   async findCartByUserId(id: number): Promise<CartDto> {
  //     return await this.rep.findOne({
  //       where: { userId: id },
  //       relations: ['product', 'size'],
  //     });
  //   }

  //   //deleteByUserId
  //   async deleteByUserId(id: number) {
  //     return await this.rep.delete({ id });
  //   }
}
