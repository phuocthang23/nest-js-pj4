import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repositoty';
import { CartRepository } from '../cart/cart.repository';
import { Cart } from '../cart/entities/cart.entity';
import { ProductRepository } from '../product/product.repository';
import { Product } from '../product/enities/product.entity';
import { OrderItem } from '../order-item/entities/orderItem.entity';
import { DataFromToken } from 'src/shared/utils/dataFormToken';
import { MailService } from '../email/mail.service';
import { RepositoryUser } from '../user/user.repository';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Cart, Product, OrderItem, User, Role]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    CartRepository,
    ProductRepository,
    DataFromToken,
    MailService,
    RepositoryUser,
  ],
})
export class OrderModule {}
