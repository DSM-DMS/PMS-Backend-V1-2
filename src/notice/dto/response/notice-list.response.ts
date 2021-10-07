import { ApiProperty } from "@nestjs/swagger";

export class NoticeList {
  @ApiProperty({ example: "notice-id" })
  id: number;

  @ApiProperty({ example: "2021-04-01" })
  "upload-date": Date;

  @ApiProperty({ example: "2020학년도 2학기 시간표 안내" })
  title: string;

  @ApiProperty({ example: "신**" })
  writer: string;

  @ApiProperty({ example: "2학기 시간표입니다.", nullable: true })
  body?: string;
}

export class NoticeListResponse {
  notices: NoticeList[];
  total_page: number;
}
