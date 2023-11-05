import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressType } from './interface/address.interface';
import { Address } from './entities/address.entity';
// import { CreateUserDto } from './dtos/CreateUser.dto';

export class AddressRepository {
  constructor(@InjectRepository(Address) private rep: Repository<Address>) {}

  async create(data: AddressType) {
    return await this.rep.save(data);
  }

  //find all
  async findAll(): Promise<Address[]> {
    return this.rep.find();
  }

  async update(id: number, data: AddressType) {
    return await this.rep.update(id, data);
  }

  //find user by id
  async findAddressById(id: number): Promise<Address> {
    return await this.rep.findOneBy({ id });
  }
}
