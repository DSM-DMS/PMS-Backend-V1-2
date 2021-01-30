import axios from "axios";
import { MealRepository } from "./entity/meal.repository";

abstract class MealListData {
  protected apiKey: string;
  protected index: number;
  protected mealServiceDietInfo: any;
  protected sc_code: number;

  protected getUrl(): string {
    return `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${this.apiKey}&Type=json&pIndex=${this.index}&pSize=1&ATPT_OFCDC_SC_CODE=G10&SD_SCHUL_CODE=7430310&MMEAL_SC_CODE=${this.sc_code}`;
  }

  protected async guestOneThing(): Promise<boolean> {
    try {
      const res = await axios.get(this.getUrl());
      this.mealServiceDietInfo = res.data.mealServiceDietInfo;
      return res.data.mealServiceDietInfo ? true : false;
    } catch(err) {
      throw err;
    }
  }

  public abstract setMealList(): Promise<void>;
}

export class BreakfastMealListData extends MealListData {
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

export class LunchMealListData extends MealListData {
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

export class DinnerMealListData extends MealListData {
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