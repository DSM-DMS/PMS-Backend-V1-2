import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MealRepository } from "./meal/entity/meal.repository";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { ParentRepository } from "../shared/parent/parent.repository";
import { DmsModule } from "../shared/dms/dms.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([MealRepository, ParentRepository]),
    DmsModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
