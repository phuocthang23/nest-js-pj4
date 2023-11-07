import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';
import { DataFromToken } from 'src/shared/utils/dataFormToken';
import { AdminGuard } from 'src/shared/guard/verifyRole.guard';

@Controller('user')
// @UsePipes(new HidePasswordPipe())

// @UseGuards(RolesGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private dataFromToken: DataFromToken,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  // @UseGuards(AdminGuard)
  getUser() {
    return this.userService.findAll();
  }

  @Get('/userdetail')
  @UseGuards(AuthGuard)
  getOneUser(@Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request);
    return this.userService.findOne(Number(userIdFromToken));
  }

  @Get('/search/:data')
  @UseGuards(AuthGuard)
  // @UseGuards(AdminGuard)
  searchUser(@Param('data') data: any) {
    // const userIdFromToken = this.dataFromToken.getData(request);
    // const data = request.query.data;
    return this.userService.searchUser(data);
  }

  @Patch('/update')
  @UseGuards(AuthGuard)
  updateUserById(@Body() body: CreateUserDto, @Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request); // Lấy id từ request.user
    return this.userService.updateUsers(userIdFromToken, body);
  }

  @Patch('/status/:id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  ChangeStatus(@Param('id') id: number, @Body() body: any) {
    console.log(body);
    return this.userService.changeStatus(id, body);
  }
}
