import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { config as configDotenv } from 'dotenv';
import { JWT } from 'src/shared/utils/jwt';
import { MailService } from '../email/mail.service';
// import {JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Role } from '../role/entities/role.entity';
import { GoogleStrategy } from 'src/shared/utils/authGoogle/google.strategy';

configDotenv();
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JWT,
    MailService,
    // JwtService,
    GoogleStrategy,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
