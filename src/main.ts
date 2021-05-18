import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const port: string = process.env.PORT || "3000";

async function createNestApplication() {
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
  return app;
}

async function createSwaggerDocsConfig() {
  return new DocumentBuilder()
  .setTitle("PMS")
  .setDescription("PMS API V1")
  .setVersion("1.0")
  .setContact("jeongjiwoo0522", "https://github.com/jeongjiwoo0522", "jiwoourty@gmail.com")
  .setLicense("Licenses", "https://www.dsm-pms.com")
  .build();
}

async function bootstrap() {
  const app = await createNestApplication();
  const config = await createSwaggerDocsConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(port);
  Logger.log(`server on ${port}`, "Bootstrap");
}

bootstrap();

process.on("uncaughtException", (err) => { 
  console.error("uncaughtException (Node is alive)", err); 
});