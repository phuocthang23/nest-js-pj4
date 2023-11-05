import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './module/role/role.module';
import { UserModule } from './module/user/user.module';
import config from 'ormconfig';
import { AuthModule } from './module/auth/auth.module';
import { ShippingModule } from './module/shipping/shipping.module';
import { AddressModule } from './module/address/address.module';
import { CartModule } from './module/cart/cart.module';
import { CategoriesModule } from './module/categories/categories.module';
import { WishlistModule } from './module/wishlist/wishlist.module';
import { ProductModule } from './module/product/product.module';
import { ImageProductModule } from './module/image-product/image-product.module';
import { SizeModule } from './module/size/size.module';
import { OrderModule } from './module/order/order.module';
// import { SizeProductModule } from './module/size-product/size-product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    RoleModule,
    AuthModule,
    ShippingModule,
    AddressModule,
    CartModule,
    CategoriesModule,
    WishlistModule,
    ProductModule,
    ImageProductModule,
    SizeModule,
    OrderModule,
    WishlistModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_TOKEN,
      signOptions: { expiresIn: '1d', algorithm: 'HS256' }, //* check
    }),
  ],
  controllers: [],
})
export class AppModule {}
