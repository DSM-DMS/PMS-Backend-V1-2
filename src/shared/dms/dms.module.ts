import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DmsServiceImpl } from "./dms.service";
import { MealListRepository } from "./entity/dms.meal.repository";

export const DMS_SERVICE_TOKEN = "DmsService";

@Module({
  imports: [TypeOrmModule.forFeature([MealListRepository], "dmsConnection")],
  providers: [
    {
      provide: DMS_SERVICE_TOKEN,
      useClass: DmsServiceImpl,
    },
  ],
  exports: [DMS_SERVICE_TOKEN],
})
export class DmsModule {}
