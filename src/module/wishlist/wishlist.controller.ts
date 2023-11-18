import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { DataFromToken } from 'src/shared/utils/dataFormToken';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';

@Controller('wishlist')
@UseGuards(AuthGuard)
export class WishlistController {
  constructor(
    private wishlistService: WishlistService,
    private dataFromToken: DataFromToken,
  ) {}

  @Post('/create')
  async addToCart(@Body() body: any, @Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request);
    return await this.wishlistService.addToWishList(body, userIdFromToken);
  }

  @Get('/')
  async getAll() {
    return await this.wishlistService.getAll();
  }

  @Get('/me')
  async getCart(@Request() request: Request) {
    const userIdFromToken = this.dataFromToken.getData(request);
    console.log(await this.wishlistService.getWishListUser(userIdFromToken));
    return await this.wishlistService.getWishListUser(userIdFromToken);
  }

  //deleteByUserId
  @Delete('/delete/:id')
  async deleteByUserId(@Param('id') id: number) {
    return await this.wishlistService.deleteByUserId(id);
  }
}
