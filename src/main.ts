import "dotenv/config";

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";

const port: string = process.env.PORT || "3000";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(port);
  Logger.log(`server on ${port}`, "Bootstrap");
}
bootstrap();
