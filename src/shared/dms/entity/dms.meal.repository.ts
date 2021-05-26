import { EntityRepository, Repository } from "typeorm";
import { MealList } from "../interface";
import { MealListEntity } from "./dms.meal.entity";

@EntityRepository(MealListEntity)
export class MealListRepository extends Repository<MealListEntity> {
  public findAllByDate(date: string): Promise<MealList[]> {
    return this.createQueryBuilder("meal")
      .select("type")
      .addSelect("meal")
      .where("meal.date = :date", { date })
      .orderBy("meal.type")
      .getMany();
  }
}
