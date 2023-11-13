import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserParams } from 'src/shared/utils/types';
// import { CreateUserDto } from './dtos/CreateUser.dto';

export class RepositoryUser {
  constructor(@InjectRepository(User) private rep: Repository<User>) {}

  async getUserByEmail(data) {
    const checkEmail = await this.rep.findOne({
      where: {
        email: data.email,
      },
    });
    return checkEmail;
  }

  async findUserBySearch(data): Promise<User[]> {
    return await this.rep.find({
      where: [
        { lastName: ILike(`%${data}%`) },
        { firstName: ILike(`%${data}%`) },
        { email: ILike(`%${data}%`) },
      ],
    });
  }

  // async create(data: any): Promise<User | { message: string }> {
  //   return await this.rep.save(data);
  // }

  //find all
  async findAll(data: any): Promise<User[]> {
    return this.rep.find({
      where: data.data && [
        { lastName: ILike(`%${data.data}%`) },
        { firstName: ILike(`%${data.data}%`) },
        { email: ILike(`%${data.data}%`) },
      ],
      relations: ['role'],
    });
  }

  async update(id: number, data: CreateUserParams) {
    return await this.rep.update(id, {
      ...data,
    });
  }

  // async findUserById(id: number): Promise<User> {
  //   console.log(this.rep.findOneById(id));
  //   return await this.rep.findOneBy(where { id : id});
  // }

  //find user by id
  async findUserById(id: number): Promise<User> {
    return await this.rep.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  //remove user by id
  async toggleUserStatus(id: number, data: CreateUserParams) {
    return await this.rep.update(id, {
      ...data,
    });
  }
}
