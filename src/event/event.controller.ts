import { Controller, Get, Param } from "@nestjs/common";
import { MealRepository } from "./meal/entity/meal.repository";

@Controller("event")
export class EventController {
  constructor(private mealRepository: MealRepository) {}

  @Get("/meal/picture/:datetime")
  showMealPictures(@Param("datetime") datetime: string) {
    return this.mealRepository.getOneByDatetimeWithPicture(datetime);
  }
}
