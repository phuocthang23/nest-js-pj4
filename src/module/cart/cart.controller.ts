import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';
import { DataFromToken } from 'src/shared/utils/dataFormToken';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private dataFromToken: DataFromToken,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  async addToCart(@Body() body: CartDto, @Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request);
    return await this.cartService.addToCarts(body, userIdFromToken);
  }

  @Get('/')
  async getAll() {
    return await this.cartService.getAll();
  }

  @Get('/me')
  async getCart(@Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request);
    return this.cartService.getCart(userIdFromToken);
  }

  //deleteByUserId
  @Delete('/delete/:id')
  async deleteByUserId(@Param('id') id: number) {
    return await this.cartService.deleteByUserId(id);
  }
}
