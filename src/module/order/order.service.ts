import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repositoty';
import { CartRepository } from './../cart/cart.repository';
import { ProductRepository } from '../product/product.repository';
import { MailService } from '../email/mail.service';
import { RepositoryUser } from '../user/user.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
    private mailerService: MailService,
    private userRepo: RepositoryUser,
  ) {}

  async create(data: any, id: any) {
    const dataOrder = {
      ...data,
      userId: id,
    };
    const order = await this.orderRepository.create(dataOrder);
    const user = await this.userRepo.findUserById(id);
    const html = `<h1>Đơn hàng của bạn đã được xác nhận</h1>
    <h2> Cảm ơn ${user.firstName} ${user.lastName} đã đặt hàng ở TFoody </h2>
    <img src="https://www.abtasty.com/wp-content/uploads/Shopping-cart-abandonment-1-1-scaled.jpg">`;

    await this.mailerService.sendConfirmationOrder(dataOrder?.code, user, html);
    await this.mailerService.sendOrderAdmin(dataOrder?.code, user);
    const cart = await this.cartRepository.findCartByUserId(order.userId);

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
      if (productItem.stock < item.quantity) {
        // throw new HttpException('Số lượng sản phẩm không đủ');
        throw new HttpException(
          'Số lượng sản phẩm không đủ',
          HttpStatus.BAD_REQUEST,
        );
        // throw new Error('Số lượng sản phẩm không đủ');
      }
      await this.productRepository.update(productItem.id, {
        stock: productItem.stock - item.quantity,
        count: productItem.count + item.quantity,
      });
    }

    return await this.cartRepository.deleteAllCartUser(Number(order.userId));
  }

  //get all
  async findAll() {
    return await this.orderRepository.findAll();
  }

  //get one buy id
  async findMyOrder(id: number) {
    return await this.orderRepository.findOne(id);
  }

  async updateStatus(item: number, id: any) {
    return await this.orderRepository.update(id, item);
  }

  async findOrderById(id: number) {
    return await this.orderRepository.findOrderById(id);
  }
}
