import { BadRequestException, Injectable } from "@nestjs/common";
import { MealRepository } from "./meal/entity/meal.repository";
import { MealResponseData } from "./meal/meal.dto";

@Injectable()
export class EventService {
  constructor(private mealRepository: MealRepository) {}

  public async getPicturesOnTheDay(datetime: string): Promise<MealResponseData> {
    const response: MealResponseData = await this.mealRepository.getOneByDatetimeWithPicture(datetime);
    if(!response) {
      throw new BadRequestException("Not found meal data");
    }
    return response;
  }
}
