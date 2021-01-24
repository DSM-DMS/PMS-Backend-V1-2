import { BadRequestException } from "@nestjs/common";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Meal } from "./meal.entity";

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {
  static getQueryRepository() {
    return getCustomRepository(MealRepository);
  }

  public async getOneByDatetimeWithPicture(datetime: string): Promise<Meal> {
    const meal: Meal = await this.createQueryBuilder("meal")
    .select("meal.breakfast_img", "breakfast")
    .addSelect("meal.lunch_img", "lunch")
    .addSelect("meal.dinner_img", "dinner")
    .where("meal.datetime = :datetime", { datetime })
    .getRawOne();
    if(!meal) {
      throw new BadRequestException("Not found meal pictures");
    } else {
      return meal;
    }
  }
}