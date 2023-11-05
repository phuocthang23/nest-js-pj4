import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RepositoryUser } from './user.repository';
import { DataFromToken } from 'src/shared/utils/dataFormToken';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, RepositoryUser, DataFromToken],
})
export class UserModule {}
