import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class NoticeCommentRequest {
  @ApiProperty({ example: "댓글" })
  @IsString()
  @Length(1, 500)
  body: string;

  @ApiProperty({ example: "최상위 댓글은 null, 대댓글은 상위 댓글의 id" })
  @IsNumber()
  @IsOptional()
  comment_id: number | null;
}
