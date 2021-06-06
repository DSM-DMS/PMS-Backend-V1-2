import { ApiProperty } from "@nestjs/swagger";
import { Parent } from "../../../shared/parent/interface";

export class NoticeCommentResponse {
  @ApiProperty({ example: "123" })
  id: number;

  @ApiProperty({ example: () => new Date() })
  "upload-date": Date;

  @ApiProperty({ example: "대댓글1" })
  body: string;

  @ApiProperty({ example: "{ email, name, user_role }" })
  user: Parent;
}
