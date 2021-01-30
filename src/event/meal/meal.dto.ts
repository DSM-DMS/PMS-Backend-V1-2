export class MealResponseData {
  breakfast: string | string[];
  lunch: string | string[];
  dinner: string | string[];
}

export class UploadPictureDto {
  datetime: string;
  mealcode: number;
}

export class UploadPictureResponseData {
  location: string;
}