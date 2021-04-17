import { Comment } from "../comment/comment.entity";
import { ApiProperty } from "@nestjs/swagger";

export class NoticeInfoResObj {
  @ApiProperty({ example: "notice-id" })
  id: number;

  @ApiProperty({ example: "2021-04-01" })
  "upload-date": Date;

  @ApiProperty({ example: "2020학년도 2학기 시간표 안내" })
  title: string;

  @ApiProperty({ example: "2학기 시간표입니다." })
  body: string;

  @ApiProperty({ example: "[https://example.com/helloworld]" })
  attach: string[];

  @ApiProperty({ example: "[...]" })
  comment: Comment[];
}