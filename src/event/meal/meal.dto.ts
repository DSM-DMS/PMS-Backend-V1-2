import { IsString } from "class-validator";

export class MealResponseData {
  breakfast: string | string[];
  lunch: string | string[];
  dinner: string | string[];
}

export class UploadPictureDto {
  @IsString()
  public readonly datetime: string;

  @IsString()
  public readonly mealcode: string;
}

export class UploadPictureResponseData {
  location: string;
}