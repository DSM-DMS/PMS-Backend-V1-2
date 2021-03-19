import { EntityRepository, Repository } from "typeorm";
import { MealList } from './dms.meal.entity';

@EntityRepository(MealList)
export class MealListRepository extends Repository<MealList> {
}