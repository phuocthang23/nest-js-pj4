import { Product } from 'src/module/product/enities/product.entity';
import { Size } from 'src/module/size/entities/size.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('product-size')
export class ProductSize {
  @PrimaryColumn()
  sizeId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, (product) => product.sizeProducts)
  product: Product;

  @ManyToOne(() => Size, (Size) => Size.sizeProducts)
  size: Size;
}
