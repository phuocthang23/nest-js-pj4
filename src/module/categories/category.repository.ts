import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { category } from './interface/category';
import { Categories } from './entities/category.entity';
// import { CreateUserDto } from './dtos/CreateUser.dto';

export class CategoryRepository {
  constructor(
    @InjectRepository(Categories) private rep: Repository<Categories>,
  ) {}

  async create(data: category) {
    return await this.rep.save(data);
  }

  //find all
  async findAll(): Promise<Categories[]> {
    return this.rep.find();
  }

  async update(id: number, data: Categories): Promise<any | boolean> {
    const checkCategory = await this.rep.findOneBy({ id });
    if (!checkCategory) {
      return false;
    }
    return await this.rep.update(id, data);
  }

  //find user by id
  async findAddressById(id: number): Promise<Categories> {
    return await this.rep.findOneBy({ id });
  }
}
