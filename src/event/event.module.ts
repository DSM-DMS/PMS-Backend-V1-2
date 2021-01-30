import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MealRepository } from "./meal/entity/meal.repository";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { ParentRepository } from "src/shared/parent/parent.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MealRepository, ParentRepository])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
