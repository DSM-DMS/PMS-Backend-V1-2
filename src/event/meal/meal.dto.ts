import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator"

export class MealResponseData {
  breakfast: string | string[];
  lunch: string | string[];
  dinner: string | string[];
}

export class UploadPictureDto {
  @ApiProperty({ example: "20210104" })
  @IsString()
  public readonly datetime: string;

  @ApiProperty({ example: "1" })
  @IsString()
  public readonly mealcode: string;
}

export class UploadPictureResponseData {
  location: string;
}