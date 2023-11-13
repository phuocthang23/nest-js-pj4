import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { productDto } from './dtos/product.dto';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';
import { AdminGuard } from 'src/shared/guard/verifyRole.guard';
// import { FormDataRequest } from 'nestjs-form-data';

@Controller('product')
// @UseGuards(AdminGuard)
export class ProductController {
  constructor(
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  // @FormDataRequest()
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Body() data: productDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    try {
      // Tải lên ảnh lên Cloudinary
      const imageResponses =
        await this.cloudinaryService.uploadMultipleFiles(images);

      // Lấy các URL của ảnh từ Cloudinary responses
      const imageUrls = imageResponses.map((response) => response.secure_url);

      // Cập nhật đường dẫn hình ảnh vào dữ liệu sản phẩm
      data.images = imageUrls;

      // Tạo sản phẩm
      const createdProduct = await this.productService.create(data);

      return createdProduct;
    } catch (error) {
      console.error(error);
      throw new Error('Đã xảy ra lỗi khi tạo sản phẩm');
    }
  }

  @Get('/')
  getAllProducts(@Query() data: any) {
    return this.productService.findAll(data);
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  updateProduct(@Param('id') id: number, @Body() body: any) {
    return this.productService.update(id, body);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Get('/category/:id')
  getProductByCategory(@Param('id') id: number) {
    return this.productService.findProductByCategory(id);
  }

  // @Get('/search')
  // // @UseGuards(AdminGuard)
  // searchUser(@Query() data: any) {
  //   const query = data.data;
  //   return this.productService.searchProduct(query);
  // }
}
