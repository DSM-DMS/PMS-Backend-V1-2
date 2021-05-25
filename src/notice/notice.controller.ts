import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { NoticeInfoResponse } from "./dto/response/notice-info.response";
import { NoticeListResponse } from "./dto/response/notice-list.response";
import { NoticeService } from "./notice.service";

@ApiTags("notice")
@ApiBearerAuth()
@ApiHeader({ name: "Authorization", required: true })
@Controller("notice")
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Get("/")
  @ApiOperation({
    summary: "공지사항 목록 API",
    description: "성공 시 상태 코드 200 반환",
  })
  @ApiResponse({ status: 200, type: [NoticeListResponse] })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  getNoticeList() {
    return this.noticeService.getNoticeList();
  }

  @Get("/:notice_id")
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "공지사항 정보 API",
    description: "성공 시 상태 코드 200 반환",
  })
  @ApiResponse({ status: 200, type: NoticeInfoResponse })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  getNoticeInfo(@Param("notice_id") notice_id: number) {
    return this.noticeService.getNoticeInfo(notice_id);
  }
}
