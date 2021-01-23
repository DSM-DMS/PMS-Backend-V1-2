import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { connectionOptions } from "ormconfig";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpErrorFilter } from "./shared/http-error.filter";
import { EventModule } from "./event/event.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions[process.env.NODE_ENV]),
    EventModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
