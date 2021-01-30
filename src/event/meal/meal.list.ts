import { Meal } from "./entity/meal.entity";
import { MealRepository } from "./entity/meal.repository";
import { MealListDataFactory } from "./meal.type";

export class BreakfastMealListDataFactory extends MealListDataFactory {
  constructor() {
    super();
    this.apiKey = process.env.NEIS_API_KEY;
    this.index = 510;
    this.sc_code = 1;
    this.setMealList();
  }
  public async setMealList(): Promise<void> {
    while(await this.guestOneThing()) {
      this.index++;
      await MealRepository.getQueryRepository()
      .setListData({ 
        date: this.mealServiceDietInfo[1].row[0].MLSV_YMD,
        list: this.mealServiceDietInfo[1].row[0].DDISH_NM, 
        time: "breakfast_list" 
      });
    }
  }
  public async getMeallist(datetime: string): Promise<string[]> {
    const meal: Meal = await MealRepository.getQueryRepository().getOrMakeOne(datetime);
    return meal.breakfast_list.replace(/([0-9]+\.)+/g, "").split("<br/>");
  }
}

export class LunchMealListDataFactory extends MealListDataFactory {
  constructor() {
    super();
    this.apiKey = process.env.NEIS_API_KEY;
    this.index = 501;
    this.sc_code = 2;
    this.setMealList();
  }
  public async setMealList(): Promise<void> {
    while(await this.guestOneThing()) {
      this.index++;
      MealRepository.getQueryRepository()
      .setListData({ 
        date: this.mealServiceDietInfo[1].row[0].MLSV_YMD,
        list: this.mealServiceDietInfo[1].row[0].DDISH_NM, 
        time: "lunch_list" 
      });
    }
  }
  public async getMeallist(datetime: string): Promise<string[]> {
    const meal: Meal = await MealRepository.getQueryRepository().getOrMakeOne(datetime);
    return meal.lunch_list.replace(/([0-9]+\.)+/g, "").split("<br/>");
  }
}

export class DinnerMealListDataFactory extends MealListDataFactory {
  constructor() {
    super();
    this.apiKey = process.env.NEIS_API_KEY;
    this.index = 436;
    this.sc_code = 3;
    this.setMealList();
  }
  public async setMealList(): Promise<void> {
    while(await this.guestOneThing()) {
      this.index++;
      MealRepository.getQueryRepository()
      .setListData({ 
        date: this.mealServiceDietInfo[1].row[0].MLSV_YMD,
        list: this.mealServiceDietInfo[1].row[0].DDISH_NM, 
        time: "dinner_list" 
      });
    }
  }
  public async getMeallist(datetime: string): Promise<string[]> {
    const meal: Meal = await MealRepository.getQueryRepository().getOrMakeOne(datetime);
    return meal.dinner_list.replace(/([0-9]+\.)+/g, "").split("<br/>");
  }
}