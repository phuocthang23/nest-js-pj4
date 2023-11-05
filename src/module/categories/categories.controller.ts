import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { categoryDto } from './dtos/category.dto';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';
import { AdminGuard } from 'src/shared/guard/verifyRole.guard';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private category: CategoriesService) {}

  @Post('/create')
  @UseGuards(AdminGuard)
  createAddress(@Body() body: categoryDto) {
    console.log(body);
    return this.category.create(body);
  }

  @Get('/')
  getUser() {
    return this.category.findAll();
  }

  @Get('/:id')
  getOnecategory(@Param('id') id: number) {
    return this.category.findOne(Number(id));
  }

  @Put('/update/:id')
  updateCategoryById(@Param('id') id: number, @Body() body: categoryDto) {
    return this.category.update(id, body);
  }
}
