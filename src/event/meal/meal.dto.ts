import { Meal } from "./entity/meal.entity";

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