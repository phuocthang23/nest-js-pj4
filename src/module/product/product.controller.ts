import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { productDto } from './dtos/product.dto';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';
// import { FormDataRequest } from 'nestjs-form-data';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('/create')
  // @FormDataRequest()
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Body() data: productDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    try {
      console.log(data.size);
      // Tải lên ảnh lên Cloudinary
      const imageResponses =
        await this.cloudinaryService.uploadMultipleFiles(images);

      // Lấy các URL của ảnh từ Cloudinary responses
      const imageUrls = imageResponses.map((response) => response.secure_url);

      console.log(imageUrls);
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
  getAllProducts() {
    return this.productService.findAll();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put('update/:id')
  updateProduct(@Param('id') id: number, @Body() body: any) {
    return this.productService.update(id, body);
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
