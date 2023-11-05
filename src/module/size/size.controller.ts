import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { sizeDto } from './dtos/size.dto';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
  constructor(private size: SizeService) {}
  @Post('/create')
  createAddress(@Body() body: sizeDto) {
    return this.size.create(body);
  }

  @Get('/')
  getUser() {
    return this.size.findAll();
  }

  @Get('/:id')
  getOneAddress(@Param('id') id: number) {
    return this.size.findOne(Number(id));
  }

  @Delete('/delete/:id')
  deleteSize(@Param('id') id: number) {
    return this.size.delete(id);
  }

  @Put('/update/:id')
  updateUserById(@Param('id') id: number, @Body() body: sizeDto) {
    return this.size.update(id, body);
  }
}
