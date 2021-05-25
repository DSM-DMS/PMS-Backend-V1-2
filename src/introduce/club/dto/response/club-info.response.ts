import { ApiProperty } from "@nestjs/swagger";

export class ClubInfoResponse {
  @ApiProperty({ example: "DMS" })
  title: string;

  @ApiProperty({ example: "https://www.dsm-dms.com/example.jpg" })
  uri: string;

  @ApiProperty({ example: "기숙사 지원 시스템 개발동아리" })
  explanation: string;

  @ApiProperty({ example: "['Mary', 'Frank', 'Henry']" })
  member?: string[];
}
