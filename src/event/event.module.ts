import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MealRepository } from "./meal/entity/meal.repository";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { DmsModule } from "../shared/dms/dms.module";
import { ParentModule } from "../shared/parent/parent.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([MealRepository]),
    DmsModule,
    ParentModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
