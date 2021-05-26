import { MealList } from "./entity/dms.entity.interface";

export interface DmsService {
  findMealOnOneDay(date: string): Promise<MealList[]>;
}
