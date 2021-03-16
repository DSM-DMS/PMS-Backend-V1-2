import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator"

export class MealResponseData {
  @ApiProperty({ example: "<breakfast image or list>" })
  breakfast: string | string[];

  @ApiProperty({ example: "<lunch image or list>" })
  lunch: string | string[];

  @ApiProperty({ example: "<dinner image or list>" })
  dinner: string | string[];
}

export class UploadPictureDto {
  @ApiProperty({ example: "20210310" })
  @IsString()
  public readonly datetime: string;

  @ApiProperty({ example: "1" })
  @IsString()
  public readonly mealcode: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class UploadPictureResponseData {
  @ApiProperty({ example: "/file/meal/test.png" })
  location: string;
}