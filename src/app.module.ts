import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { connectionOptions } from "ormconfig";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions[process.env.NODE_ENV])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
