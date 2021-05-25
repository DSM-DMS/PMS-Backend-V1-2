import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MealList } from "./entity/dms.meal.entity";
import { MealListRepository } from "./entity/dms.meal.repository";

@Injectable()
export class DmsService {
  constructor(
    @InjectRepository(MealListRepository, "dmsConnection")
    private dmsMealRepository: MealListRepository,
  ) {}

  public findMealOnOneDay(date: string): Promise<MealList[]> {
    return this.dmsMealRepository.findAllByDate(date);
  }
}
