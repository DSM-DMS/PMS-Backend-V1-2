import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Meal } from "./meal.entity";

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {
  static getQueryRepository() {
    return getCustomRepository(MealRepository);
  }

  public getOneByDatetime(datetime: string): Promise<Meal> {
    return this.createQueryBuilder("meal")
    .where("meal.datetime = :datetime", { datetime })
    .getOne();
  }
}