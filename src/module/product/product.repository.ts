import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './enities/product.entity';
import { ILike, Repository } from 'typeorm';
import { ISearch } from 'src/shared/utils/types';
// import { productDto } from './dtos/product.dto';

export class ProductRepository {
  constructor(@InjectRepository(Product) private rep: Repository<Product>) {}

  async create(data: any): Promise<Product> {
    return await this.rep.save(data);
  }

  async findAll(data: ISearch): Promise<Product[]> {
    return await this.rep.find({
      order: {
        id: 'DESC',
      },
      where: data.data && { nameProduct: ILike(`%${data.data}%`) },
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

  async findProductByCategory(id: number): Promise<Product[]> {
    return await this.rep.find({
      where: { categoryId: id },
      relations: ['category', 'sizes', 'imageProducts'],
    });
  }

  // async searchProduct(query: any): Promise<Product[]> {
  //   return await this.rep.find({
  //     where: [{ nameProduct: ILike(`%${query}%`) }],
  //   });
  // }
}
