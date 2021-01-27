import * as schedule from "node-schedule";

import { AbstractGetMealDateFactory } from "./meal.type";
import { MealCrawlDto } from "./meal.dto";
import { CrwalingMealDataFactory } from "./meal.crawl";

const crwalingMealData: AbstractGetMealDateFactory = new CrwalingMealDataFactory();

async function setNewMeal() {
  const newBreakfast: MealCrawlDto = await crwalingMealData.getLatestMeal(); 
  const isSaved = await crwalingMealData.setLetestMeal(newBreakfast);
  if(!isSaved) {
    setTimeout(async () => {
      const newBreakfast: MealCrawlDto = await crwalingMealData.getLatestMeal(); 
      await crwalingMealData.setLetestMeal(newBreakfast);
    }, 60000*30);
  }
}

export function setShedule() {
  const scheduleBreakfast = schedule.scheduleJob("0 0 10 * * *", setNewMeal);
  const scheduleLunch = schedule.scheduleJob("0 0 14 * * *", setNewMeal);
  const sheduleDinner = schedule.scheduleJob("0 0 19 * * *", setNewMeal);
}
