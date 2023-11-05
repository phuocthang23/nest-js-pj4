import { Injectable } from '@nestjs/common';
import { RepositoryUser } from './user.repository';
import { CreateUserParams } from 'src/shared/utils/types';
// import { CreateUserDto } from './dtos/CreateUser.dto';
import { User } from './entities/user.entity';
// import { hashPassword } from 'src/utils/bycrypt';

@Injectable()
export class UserService {
  constructor(private userRep: RepositoryUser) {}

  async findAll(): Promise<User[]> {
    console.log(this.userRep);
    return await this.userRep.findAll();
  }

  async updateUsers(id: number, data: CreateUserParams): Promise<any> {
    const checkUser = await this.userRep.findUserById(id);
    if (checkUser) {
      const updateUser = {
        firstName: !data.firstName ? checkUser.firstName : data.firstName,
        lastName: !data.lastName ? checkUser.lastName : data.lastName,
        email: !data.email ? checkUser.email : data.email,
        password: !data.password ? checkUser.password : data.password,
        avatar: !data.avatar ? checkUser.avatar : data.avatar,
        status: !data.status ? checkUser.status : data.status,
      };
      return await this.userRep.update(id, updateUser);
    } else {
      return {
        message: 'User not found',
      };
    }
  }

  async findOne(id: number): Promise<User> {
    return await this.userRep.findUserById(id);
  }

  async changeStatus(id: number): Promise<any> {
    const checkUser = await this.userRep.findUserById(id);
    if (!checkUser) {
      throw new Error('User not found');
    }
    const changeStatus = checkUser.status === 0 ? 1 : 0;
    const updateResult = await this.userRep.toggleUserStatus(id, {
      ...checkUser,
      status: changeStatus,
    });
    if (updateResult.affected === 1) {
      return changeStatus === 1
        ? 'User has been blocked'
        : 'Block operation did not work';
    } else {
      throw new Error('Error updating user status');
    }
  }
}
