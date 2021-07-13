import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "./shared/exception/http-error.filter";
import { EventModule } from "./event/event.module";
import { MealStaticFileMiddleware } from "./middleware/static.middleware";
import { CalendarModule } from "./calendar/calendar.module";
import { NoticeModule } from "./notice/notice.module";
import { IntroduceModule } from "./introduce/introduce.module";
import { TypeOrmConfigModule } from "./shared/typeorm/typeorm-config.module";
import { GalleryModule } from "./gallery/gallery.module";
import { ImageModule } from "./shared/image/image.module";

@Module({
  imports: [
    TypeOrmConfigModule,
    EventModule,
    CalendarModule,
    NoticeModule,
    IntroduceModule,
    GalleryModule,
    ImageModule,
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
