import * as schedule from "node-schedule";

import { MealCrawlData } from "./meal.type";
import { MealCrawlDataParser } from "./meal.crawl";
import { JobScheduler } from "../../shared/schedule/schedule.type";

export class MealJobScheduler extends JobScheduler {
  private crwalingMealData = new MealCrawlDataParser();

  private async setNewMeal() {
    const newBreakfast: MealCrawlData = await this.crwalingMealData.getParsingData(); 
    const isSaved = await this.crwalingMealData.setParsingData(newBreakfast);
    if(!isSaved) {
      setTimeout(async () => {
        const newBreakfast: MealCrawlData = await this.crwalingMealData.getParsingData(); 
        await this.crwalingMealData.setParsingData(newBreakfast);
      }, 60000*30);
    }
  }

  public setShedule() {
    schedule.scheduleJob("0 0 1 * * *", this.setNewMeal);
    schedule.scheduleJob("0 0 5 * * *", this.setNewMeal);
    schedule.scheduleJob("0 0 10 * * *", this.setNewMeal);
  }
}