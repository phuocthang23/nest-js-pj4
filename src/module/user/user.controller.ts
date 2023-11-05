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
@UseGuards(AuthGuard)
// @UsePipes(new HidePasswordPipe())

// @UseGuards(RolesGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private dataFromToken: DataFromToken,
  ) {}

  @Get('/')
  @UseGuards(AdminGuard)
  getUser() {
    return this.userService.findAll();
  }

  @Get('/userdetail')
  getOneUser(@Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request);
    return this.userService.findOne(Number(userIdFromToken));
  }

  @Patch('/update')
  updateUserById(@Body() body: CreateUserDto, @Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request); // Lấy id từ request.user
    return this.userService.updateUsers(userIdFromToken, body);
  }

  @Patch('/status/:id')
  @UseGuards(AdminGuard)
  ChangeStatus(@Param('id') id: number) {
    return this.userService.changeStatus(id);
  }
}
