import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { connectionOptions } from "./ormconfig";
import { HttpErrorFilter } from "./shared/http-error.filter";
import { EventModule } from "./event/event.module";
import { MealStaticFileMiddleware } from "./middleware/static.middleware";
import { CalendarModule } from './calendar/calendar.module';
import { NoticeModule } from './notice/notice.module';
import { IntroduceModule } from './introduce/introduce.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions[process.env.NODE_ENV]),
    TypeOrmModule.forRoot(connectionOptions["dms"]),
    EventModule,
    CalendarModule,
    NoticeModule,
    IntroduceModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MealStaticFileMiddleware).forRoutes("file/meal");
  }
}
