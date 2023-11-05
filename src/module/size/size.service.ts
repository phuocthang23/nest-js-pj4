import { Injectable } from '@nestjs/common';
import { sizeDto } from './dtos/size.dto';
import { Size } from './entities/size.entity';
import { SizeRepository } from './size.repository';

@Injectable()
export class SizeService {
  constructor(private sizeRepository: SizeRepository) {}

  async create(data: sizeDto): Promise<Size> {
    return await this.sizeRepository.create(data);
  }

  async findAll(): Promise<Size[]> {
    return await this.sizeRepository.findAll();
  }

  async findOne(id: number): Promise<Size> {
    return await this.sizeRepository.findAddressById(id);
  }

  async update(id: number, data: sizeDto): Promise<any> {
    const checkAddress = await this.sizeRepository.findAddressById(id);
    if (checkAddress) {
      return await this.sizeRepository.update(id, data);
    } else {
      return {
        message: 'Size not found',
      };
    }
  }

  //delete
  async delete(id: number): Promise<any> {
    return await this.sizeRepository.delete(id);
  }
}
