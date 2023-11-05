import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressType } from './interface/address.interface';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post('/create')
  createAddress(@Body() body: AddressType) {
    console.log(body);
    return this.addressService.create(body);
  }

  @Get('/')
  getUser() {
    return this.addressService.findAll();
  }

  @Get('/:id')
  getOneAddress(@Param('id') id: number) {
    return this.addressService.findOne(Number(id));
  }

  @Put('/update/:id')
  updateUserById(@Param('id') id: number, @Body() body: AddressType) {
    return this.addressService.updateAddress(id, body);
  }
}
