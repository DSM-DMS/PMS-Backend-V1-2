export class MealCrawlDto {
  date: string;
  url: string;
  time?: string;
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