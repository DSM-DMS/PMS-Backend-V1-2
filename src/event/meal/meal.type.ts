import axios from "axios";
import { MealCrawlDto } from "./meal.dto";

export abstract class AbstractGetMealDateFactory {
  public abstract getLatestMeal(): Promise<MealCrawlDto>;
  public abstract getMealOnOnePage(pageNumber: number): Promise<MealCrawlDto[]>;
  public abstract setLetestMeal(meal: MealCrawlDto): Promise<boolean>;
}

export abstract class MealListDataFactory {
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