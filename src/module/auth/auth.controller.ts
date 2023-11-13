import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/user.dto';
import { LoginUserDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  // @UsePipes(new ValidationPipe())
  createUser(@Body() body: CreateUserDto) {
    return this.authService.createUsers(body);
  }

  @Post('/login')
  getLogin(@Body() body: LoginUserDto) {
    return this.authService.findUserEmail(body);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return { msg: 'authenticated', req: req };
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log(req.user);
    return res.redirect(
      `http://localhost:3000/auth/verifyGoogle/${req.user.tokenUser}/v1`,
    );
  }
}
