import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserParams, LoginUser } from 'src/shared/utils/types';
import { JwtService } from '@nestjs/jwt';

export class AuthRepository {
  constructor(
    @InjectRepository(User) private rep: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(data: LoginUser): Promise<User> {
    const checkEmail = await this.rep.findOne({
      where: {
        email: data.email,
      },
    });

    return checkEmail;
  }

  async register(
    data: CreateUserParams,
  ): Promise<User | { message: string; success: boolean }> {
    return await this.rep.save(data);
  }

  //* google

  async loginGoogleRepository(user: any): Promise<any> {
    const existingUser = await this.rep.findOne({
      where: { email: user.email },
    });
    if (!existingUser) {
      return {
        accessToken: null,
        success: false,
        data: null,
      };
    }
    const dataGenerateToken = {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      avatar: existingUser.avatar,
      status: existingUser.status,
      password: 'defaultgooglepassword',
      role: existingUser.role,
    };
    const token = await this.jwtService.signAsync(dataGenerateToken);
    return {
      success: true,
      accessToken: token,
      data: dataGenerateToken,
    };
  }

  async createUserWithLoginGoogle(infor) {
    const result = await this.rep.save(infor);
    return result;
  }

  async getUserWithRole(email) {
    return await this.rep.find({
      where: { email: email },
      relations: ['role'],
    });
  }
}
