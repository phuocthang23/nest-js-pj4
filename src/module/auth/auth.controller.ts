import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/user.dto';
import { LoginUserDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  // @UsePipes(new ValidationPipe())
  createUser(@Body() body: CreateUserDto) {
    return this.authService.createUsers(body);
  }

  @Get('/login')
  getLogin(@Body() body: LoginUserDto) {
    return this.authService.findUserEmail(body);
  }
}
