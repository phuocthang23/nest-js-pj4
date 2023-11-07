import { Cart } from 'src/module/cart/entities/cart.entity';
import { ProductSize } from 'src/module/size-product/entities/product-size.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  // OneToMany,
  // OneToMany,
} from 'typeorm';

@Entity('size')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  size: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  priceSize: number;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @OneToMany(() => ProductSize, (sizeProduct) => sizeProduct.size, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sizeProducts: ProductSize[];

  @OneToMany(() => Cart, (cart) => cart.size, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  carts: Cart[];
}
