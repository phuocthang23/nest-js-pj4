import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/create')
  createOrderProduct(@Body() body: any) {
    return this.orderService.create(body);
  }

  @Get('/')
  getAllOrder() {
    return this.orderService.findAll();
  }

  @Put('/status/:id')
  updateStatus(@Body() body: number, @Param('id') id) {
    return this.orderService.updateStatus(body, id);
  }
}
