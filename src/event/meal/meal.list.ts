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
}