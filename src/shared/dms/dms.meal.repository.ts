import { EntityRepository, Repository } from "typeorm";
import { MealList } from "./dms.meal.entity";

@EntityRepository(MealList)
export class MealListRepository extends Repository<MealList> {
  public findAll(date: string): Promise<MealList[]> {
    return this.createQueryBuilder("meal")
      .select("type")
      .addSelect("meal")
      .where("meal.date = :date", { date })
      .orderBy("meal.type")
      .getMany();
  }
}
