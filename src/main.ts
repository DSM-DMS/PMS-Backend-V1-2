import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { setSchedule } from "./event/meal/meal.scheduler";

const port: string = process.env.PORT || "3000";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  if(process.env.NODE_ENV === "production") {
    app.enableCors({ origin: process.env.ALLOW_ORIGIN, credentials: true });
  } else {
    app.enableCors();
  }
  setSchedule();
  await app.listen(port);
  Logger.log(`server on ${port}`, "Bootstrap");
}
bootstrap();
