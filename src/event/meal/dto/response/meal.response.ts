import { ApiProperty } from "@nestjs/swagger";

export class MealResponse {
  @ApiProperty({ example: "<breakfast image or list>" })
  breakfast: string | string[];

  @ApiProperty({ example: "<lunch image or list>" })
  lunch: string | string[];

  @ApiProperty({ example: "<dinner image or list>" })
  dinner: string | string[];
}
