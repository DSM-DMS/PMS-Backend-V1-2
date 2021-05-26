import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MealListRepository } from "./entity/dms.meal.repository";
import { DmsService, MealList } from "./interface";

@Injectable()
export class DmsServiceImpl implements DmsService {
  constructor(
    @InjectRepository(MealListRepository, "dmsConnection")
    private dmsMealRepository: MealListRepository,
  ) {}

  public findMealOnOneDay(date: string): Promise<MealList[]> {
    return this.dmsMealRepository.findAllByDate(date);
  }
}
