// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';
@Injectable()
export class CloudinaryService {
  // xử lý 1 ảnh
  uploadSingleFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadOptions = {
        folder: 'Project-NestJs-ShoppingCart/imageProduct',
      };
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  // xử lý nhiều ảnh
  uploadMultipleFiles(files: Express.Multer.File[]): any {
    // Promise.all() => để đợi cho tất cả các Promise trong mảng hoàn thành.
    return Promise.all(
      files.map((file) => {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
          const uploadOptions = {
            folder: 'Project-NestJs-ShoppingCart/imageProduct',
          };
          const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      }),
    );
  }
}
