import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSize } from './entities/product-size.entity';
// import { ProductSizeDto } from './dto/size-product.dto';

export class SizeProductRepository {
  constructor(
    @InjectRepository(ProductSize) private rep: Repository<ProductSize>,
  ) {}

  async create(data: any): Promise<any> {
    console.log(data);
    return await this.rep.save(data);
  }
}
