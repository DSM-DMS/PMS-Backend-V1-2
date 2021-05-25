import { ApiProperty } from "@nestjs/swagger";

export class UploadPictureResponse {
  @ApiProperty({ example: "http://www.domain.com/file/meal/test.png" })
  location: string;
}
