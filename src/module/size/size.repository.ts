import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sizeDto } from './dtos/size.dto';
import { Size } from './entities/size.entity';

export class SizeRepository {
  constructor(@InjectRepository(Size) private rep: Repository<Size>) {}

  async create(data: sizeDto) {
    return await this.rep.save(data);
  }

  //find all
  async findAll(): Promise<Size[]> {
    return this.rep.find();
  }

  async update(id: number, data: sizeDto) {
    return await this.rep.update(id, data);
  }

  //find user by id
  async findAddressById(id: number): Promise<Size> {
    return await this.rep.findOneBy({ id });
  }

  //delete
  async delete(id: number) {
    return await this.rep.delete(id);
  }
}
