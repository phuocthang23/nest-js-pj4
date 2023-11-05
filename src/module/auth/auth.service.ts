import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { hashPassword } from 'src/shared/utils/bycrypt';
import { CreateUserParams, LoginUser } from 'src/shared/utils/types';
import { User } from '../user/entities/user.entity';
// import { JwtService } from '@nestjs/jwt';
import { JWT } from 'src/shared/utils/jwt';
// import { generate } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JWT,
  ) {}

  async createUsers(
    data: CreateUserParams,
  ): Promise<{ message: string } | User> {
    const checkEmail = await this.authRepository.getUserByEmail(data);
    if (checkEmail) {
      return {
        message: 'Email already exists',
      };
    } else {
      const hashedPassword = await hashPassword(data.password);

      const newUser = {
        ...data,
        password: hashedPassword,
      };
      console.log(newUser);
      return await this.authRepository.register(newUser);
    }
  }

  async findUserEmail(data: LoginUser): Promise<any> {
    const checkUser = await this.authRepository.getUserByEmail(data);
    console.log(checkUser); //* tìm user
    if (!checkUser) {
      throw new HttpException('email is not exist', HttpStatus.UNAUTHORIZED); //* kiểm tra user
    }
    console.log(data, checkUser.password);
    const checkPassword = bcrypt.compareSync(data.password, checkUser.password);
    if (!checkPassword) {
      throw new HttpException(
        'password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // //*generate access token
    const payload = {
      id: checkUser.id,
      email: checkUser.email,
      roleId: checkUser.roleId,
    };
    console.log(payload);
    return {
      data: checkUser,
      access_token: await this.jwt.generateToken(payload),
    };
  }
}
