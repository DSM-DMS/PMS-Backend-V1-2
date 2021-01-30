import { BadRequestException } from "@nestjs/common";
import { Meal } from "./entity/meal.entity";
import { MealRepository } from "./entity/meal.repository";
import { MealApiIndexRepository } from "./entity/mealApiIndex.repository";
import { MealListDataFactory } from "./meal.type";

export class BreakfastMealListDataFactory extends MealListDataFactory {
  constructor() {
    super();
    this.apiKey = process.env.NEIS_API_KEY;
    this.sc_code = 1;
    this.setMealList();
  }
  public async setMealList(): Promise<void> {
    const index: number = await MealApiIndexRepository.getQueryRepository().getApiIndex("breakfast_api_index");
    this.index = index ? index : 510;
    while(await this.guestOneThing()) {
      this.index++;
      await MealRepository.getQueryRepository()
      .setListData({ 
        date: this.mealServiceDietInfo[1].row[0].MLSV_YMD,
        list: this.mealServiceDietInfo[1].row[0].DDISH_NM, 
        time: "breakfast_list" 
      });
    }
    await MealApiIndexRepository.getQueryRepository().setApiIndex("breakfast_api_index", this.index);
  }
  public async getMeallist(datetime: string): Promise<string[]> {
    const meal: Meal = await MealRepository.getQueryRepository().findOne({ where: { datetime } });
    if(!meal) {
      throw new BadRequestException("unknown parameter")
    }
    return meal.breakfast_list.replace(/([0-9]+\.)+/g, "").split("<br/>");
  }
}

export class LunchMealListDataFactory extends MealListDataFactory {
  constructor() {
    super();
    this.apiKey = process.env.NEIS_API_KEY;
    this.sc_code = 2;
    this.setMealList();
  }
  public async setMealList(): Promise<void> {
    const index: number = await MealApiIndexRepository.getQueryRepository().getApiIndex("lunch_api_index");
    this.index = index ? index : 501;
    while(await this.guestOneThing()) {
      this.index++;
      MealRepository.getQueryRepository()
      .setListData({ 
        date: this.mealServiceDietInfo[1].row[0].MLSV_YMD,
        list: this.mealServiceDietInfo[1].row[0].DDISH_NM, 
        time: "lunch_list" 
      });
    }
    await MealApiIndexRepository.getQueryRepository().setApiIndex("lunch_api_index", this.index);
  }
  public async getMeallist(datetime: string): Promise<string[]> {
    const meal: Meal = await MealRepository.getQueryRepository().findOne({ where: { datetime } });
    if(!meal) {
      throw new BadRequestException("unknown parameter")
    }
    return meal.lunch_list.replace(/([0-9]+\.)+/g, "").split("<br/>");
  }
}

export class DinnerMealListDataFactory extends MealListDataFactory {
  constructor() {
    super();
    this.apiKey = process.env.NEIS_API_KEY;
    this.sc_code = 3;
    this.setMealList();
  }
  public async setMealList(): Promise<void> {
    const index: number = await MealApiIndexRepository.getQueryRepository().getApiIndex("dinner_api_index");
    this.index = index ? index : 436;
    while(await this.guestOneThing()) {
      this.index++;
      MealRepository.getQueryRepository()
      .setListData({ 
        date: this.mealServiceDietInfo[1].row[0].MLSV_YMD,
        list: this.mealServiceDietInfo[1].row[0].DDISH_NM, 
        time: "dinner_list" 
      });
    }
    await MealApiIndexRepository.getQueryRepository().setApiIndex("dinner_api_index", this.index);
  }
  public async getMeallist(datetime: string): Promise<string[]> {
    const meal: Meal = await MealRepository.getQueryRepository().findOne({ where: { datetime } });
    if(!meal) {
      throw new BadRequestException("unknown parameter")
    }
    return meal.dinner_list.replace(/([0-9]+\.)+/g, "").split("<br/>");
  }
}