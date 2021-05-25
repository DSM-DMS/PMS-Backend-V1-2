import { ApiProperty } from "@nestjs/swagger";

export class ClubList {
  @ApiProperty({ example: "<picture-uri>" })
  "picture-uri": string;

  @ApiProperty({ example: "<club-name>" })
  "club-name": string;

  @ApiProperty({ example: "기숙사 지원 시스템 개발동아리" })
  explanation: string;
}

export class ClubListResponse {
  @ApiProperty()
  clubs: ClubList[];
}
