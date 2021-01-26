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