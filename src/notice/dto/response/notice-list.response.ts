import { ApiProperty } from "@nestjs/swagger";

export class NoticeListResponse {
  @ApiProperty({ example: "notice-id" })
  id: number;

  @ApiProperty({ example: "2021-04-01" })
  "upload-date": Date;

  @ApiProperty({ example: "2020학년도 2학기 시간표 안내" })
  title: string;

  @ApiProperty({ example: "신**" })
  writer: string;
}
