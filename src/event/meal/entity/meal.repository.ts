import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { MealResponse } from "../dto/response/meal.response";
import { Meal } from "./meal.entity";

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {
  static getQueryRepository() {
    return getCustomRepository(MealRepository);
  }

  public async getOneByDatetimeWithPicture(
    datetime: string,
  ): Promise<MealResponse> {
    const meal: MealResponse = await this.createQueryBuilder("meal")
      .select("meal.breakfast_img", "breakfast")
      .addSelect("meal.lunch_img", "lunch")
      .addSelect("meal.dinner_img", "dinner")
      .where("meal.datetime = :datetime", { datetime })
      .getRawOne();
    if (!meal) {
      return null;
    } else {
      return meal;
    }
  }

  public async getOrMakeOne(datetime: string): Promise<Meal> {
    const meal: Meal = await this.findOne({ where: { datetime } });
    return meal ? meal : this.manager.save(this.create({ datetime }));
  }
}
