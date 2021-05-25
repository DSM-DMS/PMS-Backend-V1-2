import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MealRepository } from "./meal/entity/meal.repository";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { ParentRepository } from "../shared/parent/parent.repository";
import { MealListRepository } from "../shared/dms/entity/dms.meal.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([MealRepository, ParentRepository]),
    TypeOrmModule.forFeature([MealListRepository], "dmsConnection"),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
