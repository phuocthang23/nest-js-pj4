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
    return await this.rep.find({ relations: ['orderItems', 'user'] });
  }

  //update
  async update(id: any, status: any) {
    console.log(status);
    return await this.rep.update(id, status);
  }

  // find one by id
  async findOne(id: number) {
    return await this.rep.find({ where: { userId: id } });
  }

  async findOrderById(id: number) {
    return await this.rep.findOne({
      where: { id: id },
      relations: ['orderItems', 'user'],
    });
  }
}
