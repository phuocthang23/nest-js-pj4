import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { sizeDto } from './dtos/size.dto';
import { SizeService } from './size.service';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';
// import { AdminGuard } from 'src/shared/guard/verifyRole.guard';

@Controller('size')
export class SizeController {
  constructor(private size: SizeService) {}
  @Post('/create')
  @UseGuards(AuthGuard)
  createAddress(@Body() body: sizeDto) {
    return this.size.create(body);
  }

  @Get('/')
  getUser() {
    return this.size.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getOneAddress(@Param('id') id: number) {
    return this.size.findOne(Number(id));
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  deleteSize(@Param('id') id: number) {
    return this.size.delete(id);
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard)
  updateUserById(@Param('id') id: number, @Body() body: sizeDto) {
    return this.size.update(id, body);
  }
}
