import { Injectable } from '@nestjs/common';
import { category } from './interface/category';
import { Categories } from './entities/category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(data: category): Promise<Categories> {
    return await this.categoryRepository.create(data);
  }

  async findAll(): Promise<Categories[]> {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: number): Promise<Categories> {
    return await this.categoryRepository.findAddressById(id);
  }

  async update(id: number, data: any): Promise<any> {
    // console.log(id, data);
    const res = await this.categoryRepository.update(id, data);
    if (res) {
      return {
        message: 'Category updated successfully',
      };
    }
  }
}
