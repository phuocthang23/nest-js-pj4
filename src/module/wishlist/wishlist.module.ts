import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { wishList } from './entities/wishlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistRepository } from './wishlist.repository';
import { DataFromToken } from 'src/shared/utils/dataFormToken';

@Module({
  imports: [TypeOrmModule.forFeature([wishList])],
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository, DataFromToken],
})
export class WishlistModule {}
