import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { imageProduct } from './entities/image-product.entity';
import { imgProductDto } from './dtos/imageproduct.dto';

export class ImageProductRepository {
  constructor(
    @InjectRepository(imageProduct) private rep: Repository<imageProduct>,
  ) {}

  async create(data: imgProductDto) {
    return await this.rep.save(data);
  }

  //find all
  async findAll(): Promise<imageProduct[]> {
    return this.rep.find();
  }

  async update(id: number, data: imgProductDto): Promise<any> {
    return await this.rep.update(id, data);
  }

  //find user by id
  async findAddressById(id: number): Promise<imageProduct> {
    return await this.rep.findOneBy({ id });
  }
}
