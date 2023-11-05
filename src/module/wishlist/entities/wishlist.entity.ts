import { Product } from 'src/module/product/enities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('wishList')
export class wishList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column({ type: 'int', nullable: true })
  productId: number;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.wishlists)
  product: Product;
}
