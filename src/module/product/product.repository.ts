import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './enities/product.entity';
import { Repository } from 'typeorm';
// import { productDto } from './dtos/product.dto';

export class ProductRepository {
  constructor(@InjectRepository(Product) private rep: Repository<Product>) {}

  async create(data: any): Promise<Product> {
    return await this.rep.save(data);
  }

  async findAll(): Promise<Product[]> {
    return await this.rep.find({
      relations: ['category', 'sizes', 'imageProducts'],
    });
  }
  async findProductById(id: number): Promise<any> {
    return await this.rep.findOne({
      where: { id: id },
      relations: ['category', 'sizes', 'imageProducts'],
    });
  }

  async findOneProductById(id: number): Promise<any> {
    return await this.rep.findOne({
      where: { id: id },
      relations: ['category', 'sizes', 'imageProducts'],
    });
  }

  async createProductSize(id: number): Promise<Product> {
    return await this.rep.findOneBy({ id });
  }

  async update(id: number, data: any): Promise<any> {
    return await this.rep.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return await this.rep.delete(id);
  }
}
