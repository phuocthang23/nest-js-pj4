import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import { AuthGuard } from './shared/guard/checkAuth.guard';
// import { JwtService } from '@nestjs/jwt';
// import { DataFromToken } from './shared/utils/dataFormToken';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, { cors: true });

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  // const corsOptions = {
  //   allowedHeaders: '*',
  //   origin: 'http://localhost:3000',
  //   credentials: true, //access-control-allow-credentials:true
  //   optionSuccessStatus: 200,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // };
  app.enableCors({
    credentials: true,
    origin: `http://localhost:3000`,
    methods: 'GET,HEAD,PUT,PATCH,DELETE,POST',
    allowedHeaders: ['Authorization', 'Content-Type'],
    optionsSuccessStatus: 200,
  }); // <- enable CORS
  // app.enableCors(corsOptions);
  // app.useGlobalGuards(new AuthGuard(new JwtService(), new DataFromToken()));
  await app.listen(port, () => console.log(`listening on port ${port}`));
}
bootstrap();
