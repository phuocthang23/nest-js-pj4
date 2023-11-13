import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { DataFromToken } from 'src/shared/utils/dataFormToken';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';
import { AdminGuard } from 'src/shared/guard/verifyRole.guard';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private dataFromToken: DataFromToken,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  createOrderProduct(@Body() body: any, @Request() request: Request) {
    console.log(body);
    const userIdFromToken = this.dataFromToken.getData(request);
    return this.orderService.create(body, userIdFromToken);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  getMyOrder(@Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request);
    return this.orderService.findMyOrder(userIdFromToken);
  }

  @Get('/:id')
  getOrderById(@Param('id') id: number) {
    return this.orderService.findOrderById(id);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  getAllOrder() {
    return this.orderService.findAll();
  }

  @Put('/status/:id')
  @UseGuards(AuthGuard)
  updateStatus(@Body() body: number, @Param('id') id) {
    return this.orderService.updateStatus(body, id);
  }
}
