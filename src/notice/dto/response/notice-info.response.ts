import { Comment } from "../../comment/comment.entity";
import { ApiProperty } from "@nestjs/swagger";
import { NoticeAttach } from "../../../notice/entity/notice-attach.entity";

export class NoticeInfoResponse {
  @ApiProperty({ example: "notice-id" })
  id: number;

  @ApiProperty({ example: "2021-04-01" })
  "upload-date": Date;

  @ApiProperty({ example: "2020학년도 2학기 시간표 안내" })
  title: string;

  @ApiProperty({ example: "2학기 시간표입니다." })
  body: string;

  @ApiProperty({ example: "신**" })
  writer: string;

  @ApiProperty({
    example:
      "[{ download: https://example.com/helloworld, name: 2학기 가정통신문.hwp }]",
    description: "download: 다운로드 링크, name: 첨부파일이름",
  })
  attach: NoticeAttach[];

  @ApiProperty({ example: "[...]" })
  comment: Comment[];
}
