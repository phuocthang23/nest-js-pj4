import {
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageProductService } from './image-product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { AuthGuard } from 'src/shared/guard/checkAuth.guard';

@Controller('image-product')
export class ImageProductController {
  constructor(
    private imageProductService: ImageProductService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('/')
  // @UseGuards(AuthGuard)
  @UseGuards(AuthGuard)
  async getAllImages() {
    return await this.imageProductService.findAll();
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') id: number,
    // @Body() body: imgProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(image);

    const imageResponse = await this.cloudinaryService.uploadSingleFile(image);
    console.log(imageResponse, 'imageResponse');
    const updatedImage = await this.imageProductService.updateImage(id, {
      src: imageResponse.secure_url,
    });
    console.log(updatedImage, 'updatedImage');
    return updatedImage;
  }
}
