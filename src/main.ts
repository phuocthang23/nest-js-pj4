import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AuthGuard } from './shared/guard/checkAuth.guard';
import { JwtService } from '@nestjs/jwt';
import { DataFromToken } from './shared/utils/dataFormToken';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard(new JwtService(), new DataFromToken()));
  await app.listen(port, () => console.log(`listening on port ${port}`));
}
bootstrap();
