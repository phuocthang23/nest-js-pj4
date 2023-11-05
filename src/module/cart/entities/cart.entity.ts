import { Product } from 'src/module/product/enities/product.entity';
import { Size } from 'src/module/size/entities/size.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('Cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column({ type: 'int', nullable: true })
  productId: number;

  @Column({ type: 'int', nullable: true })
  sizeId: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;

  @ManyToOne(() => Size, (product) => product.carts)
  size: Size;
}
