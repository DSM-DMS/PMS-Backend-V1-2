import { ApiProperty } from "@nestjs/swagger";

export class ClubInfoResObj {
  @ApiProperty({ example: "DMS" })
  title: string;

  @ApiProperty({ example: "https://www.dsm-dms.com/example.jpg" })
  uri: string;

  @ApiProperty({ example: "기숙사 지원 시스템 개발동아리" })
  explanation: string;

  @ApiProperty({ example: "['Mary', 'Frank', 'Henry']" })
  member?: string[];
}

export class ClubList {
  @ApiProperty({ example: "<picture-uri>" })
  "picture-uri": string;

  @ApiProperty({ example: "<club-name>" })
  "club-name": string;

  @ApiProperty({ example: "기숙사 지원 시스템 개발동아리" })
  explanation: string;
}

export class ClubListResObj {
  @ApiProperty()
  clubs: ClubList[];
}
