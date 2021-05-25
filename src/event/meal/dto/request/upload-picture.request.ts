import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UploadPictureRequest {
  @ApiProperty({ example: "20210310" })
  @IsString()
  public readonly datetime: string;

  @ApiProperty({ example: "1" })
  @IsString()
  public readonly mealcode: string;

  @ApiProperty({ type: "string", format: "binary" })
  file: any;
}
