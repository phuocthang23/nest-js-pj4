import { Product } from 'src/module/product/enities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('image-product')
export class imageProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  src: string;

  @Column({ type: 'int', nullable: false })
  productId: number;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.imageProducts)
  product: Product;
}
