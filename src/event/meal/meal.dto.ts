import { Meal } from "./entity/meal.entity";

export class MealCrawlDto {
  date: string;
  url: string;
  time?: string;
}

export class MealListDto {
  date: string;
  list: string;
  time: keyof Meal;
}

export class MealResponseData {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export class UploadPictureDto {
  datetime: string;
  mealcode: number;
}

export class UploadPictureResponseData {
  location: string;
}