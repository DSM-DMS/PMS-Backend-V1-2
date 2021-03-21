import * as schedule from "node-schedule";

import { AbstractGetMealDateFactory, MealCrawlData } from "./meal.type";
import { CrawlingMealDataFactory } from "./meal.crawl";
import { Logger } from "@nestjs/common";

const crawlingMealData: AbstractGetMealDateFactory = new CrawlingMealDataFactory();

async function setNewMeal() {
  const newBreakfast: MealCrawlData = await crawlingMealData.getLatestMeal(); 
  const isSaved = await crawlingMealData.setLetestMeal(newBreakfast);
  Logger.log(`set schedule ${isSaved}`);
  if(!isSaved) {
    setTimeout(async () => {
      const newBreakfast: MealCrawlData = await crawlingMealData.getLatestMeal(); 
      await crawlingMealData.setLetestMeal(newBreakfast);
    }, 60000*30);
  }
}

export async function setSchedule() {
  const scheduleBreakfast = schedule.scheduleJob("0 0 10 * * *", setNewMeal);
  const scheduleLunch = schedule.scheduleJob("0 0 14 * * *", setNewMeal);
  const sheduleDinner = schedule.scheduleJob("0 0 19 * * *", setNewMeal);
}
