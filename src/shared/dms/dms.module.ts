import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MealListRepository } from "./entity/dms.meal.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MealListRepository], "dmsConnection")],
})
export class DmsModule {}
