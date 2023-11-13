import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { hashPassword } from 'src/shared/utils/bycrypt';
import { CreateUserParams, LoginUser } from 'src/shared/utils/types';
import { User } from '../user/entities/user.entity';
import { JWT } from 'src/shared/utils/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from '../email/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JWT,
    private mailerService: MailService,
  ) {}

  async createUsers(
    data: CreateUserParams,
  ): Promise<{ message: string; success: boolean } | User> {
    const checkEmail = await this.authRepository.getUserByEmail(data);
    if (checkEmail) {
      return {
        success: false,
        message: 'Email already exists',
      };
    } else {
      const hashedPassword = await hashPassword(data.password);

      const newUser = {
        ...data,
        password: hashedPassword,
      };
      await this.mailerService.sendUserConfirmation(newUser); // sử dụng để gửi thông tin đến mail
      return await this.authRepository.register(newUser);
    }
  }

  async findUserEmail(data: LoginUser): Promise<any> {
    const checkUser = await this.authRepository.getUserByEmail(data);
    console.log(checkUser); //* tìm user
    if (!checkUser) {
      // throw new HttpException('email is not exist', HttpStatus.UNAUTHORIZED); //* kiểm tra user
      return {
        success: false,
        message: 'email is not exist',
      };
    }
    // console.log(data, checkUser.password);
    const checkPassword = bcrypt.compareSync(data.password, checkUser.password);
    if (!checkPassword) {
      // throw new HttpException(
      //   'password is not correct',
      //   HttpStatus.UNAUTHORIZED,
      // );
      return {
        success: false,
        message: 'password is not correct',
      };
    }

    // //*generate access token
    const payload = {
      id: checkUser.id,
      email: checkUser.email,
      roleId: checkUser.roleId,
    };
    return {
      data: checkUser,
      access_token: await this.jwt.generateToken(payload),
    };
  }

  async validateUser(details) {
    console.log(details, '222222');

    const user = await this.authRepository.getUserByEmail(details);

    if (user) {
      const payload = {
        id: user.id, // Sử dụng id của người dùng từ cơ sở dữ liệu thay vì random
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        roleId: user.roleId, // Sử dụng roleId từ cơ sở dữ liệu nếu có
      };
      const tokenUser = await this.jwt.generateToken(payload);
      console.log(tokenUser, 'tokenUser');

      return { userLoginWithGoogle: user, tokenUser };
    } else {
      console.log('User not found. Creating...');
      const newUser = await this.authRepository.createUserWithLoginGoogle({
        email: details.email,
        password: Math.floor(Math.random() * 1000000),
        firstName: details.firstName,
        lastName: details.lastName,
        status: 0,
        roleId: 2,
        avatar: details.picture,
      });
      console.log(77777777777, newUser);

      const user: any = await this.authRepository.getUserWithRole(
        newUser.email,
      );
      console.log(user, '-------------------');
      const tokenUser = await this.jwt.generateToken({
        id: user?.id,
        email: user?.email,
        roleId: user?.roleId,
      });
      console.log(tokenUser);
      return { userLoginWithGoogle: user, tokenUser: tokenUser };
    }
  }
  // async loginGoogleService(req: any) {
  //   return await this.authRepository.loginGoogleRepository(req.user);
  // }
}
