import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserParams, LoginUser } from 'src/shared/utils/types';

export class AuthRepository {
  constructor(@InjectRepository(User) private rep: Repository<User>) {}

  async getUserByEmail(data: LoginUser): Promise<User> {
    const checkEmail = await this.rep.findOne({
      where: {
        email: data.email,
      },
    });
    console.log(checkEmail);
    return checkEmail;
  }

  async register(data: CreateUserParams): Promise<User | { message: string }> {
    return await this.rep.save(data);
  }
}
