import { Cart } from 'src/module/cart/entities/cart.entity';
import { Categories } from 'src/module/categories/entities/category.entity';
import { imageProduct } from 'src/module/image-product/entities/image-product.entity';
import { OrderItem } from 'src/module/order-item/entities/orderItem.entity';
import { ProductSize } from 'src/module/size-product/entities/product-size.entity';
import { Size } from 'src/module/size/entities/size.entity';
import { wishList } from 'src/module/wishlist/entities/wishlist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  // OneToMany,
  // OneToMany,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nameProduct: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  categoryId: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => Categories, (Categories) => Categories.products, {
    eager: true,
  })
  category: Categories;

  @ManyToMany(() => Size)
  @JoinTable({ name: 'product-size' })
  sizes: Size[];

  @OneToMany(() => ProductSize, (sizeProduct) => sizeProduct.product, {
    eager: true,
  })
  sizeProducts: ProductSize[];

  @OneToMany(() => imageProduct, (imageProduct) => imageProduct.product, {
    eager: true,
  })
  imageProducts: imageProduct[];

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product) // Mối quan hệ với OrderItem
  orderItems: OrderItem[];

  @OneToMany(() => wishList, (cart) => cart.product)
  wishlists: wishList[];
}
