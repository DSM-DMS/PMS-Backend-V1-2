import { MealCrawlDto } from "./meal.dto";

export abstract class AbstractGetMealDateFactory {
  public abstract getLatestMeal(): Promise<MealCrawlDto>;
  public abstract getMealOnOnePage(pageNumber: number): Promise<MealCrawlDto[]>;
  public abstract setLetestMeal(meal: MealCrawlDto): Promise<boolean>;
}