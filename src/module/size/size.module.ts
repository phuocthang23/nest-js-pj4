import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { Size } from './entities/size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeRepository } from './size.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],

  controllers: [SizeController],
  providers: [SizeService, SizeRepository],
})
export class SizeModule {}
