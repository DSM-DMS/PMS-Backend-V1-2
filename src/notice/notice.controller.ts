import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { Auth } from "../shared/authentication/auth.decorator";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { NoticeCommentRequest } from "./dto/request/notice-comment.request";
import { NoticeCommentResponse } from "./dto/response/notice-comment.response";
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
    description: "공지사항 목록을 객체로 반환",
  })
  @ApiQuery({ name: "page", type: Number, required: true })
  @ApiQuery({ name: "size", type: Number, required: false })
  @ApiResponse({ status: 200, type: [NoticeListResponse] })
  @ApiResponse({ status: 200, type: [NoticeListResponse] })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  getNoticeList(
    @Query("page", new ParseIntPipe()) page: number,
    @Query("size") size: number
  ) {
    return this.noticeService.getNoticeList(page, size || 6);
  }

  @Get("/search")
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "공지사항 검색 API",
    description: "해당하는 키워드의 공지사항 목록을 객체로 반환",
  })
  @ApiQuery({
    name: "q",
    type: String,
    required: true,
    description: "검색할 키워드",
  })
  @ApiQuery({ name: "page", type: Number, required: true })
  @ApiResponse({ status: 200, type: [NoticeListResponse] })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  getNoticeBySearch(
    @Query("q") keyword: string,
    @Query("page", new ParseIntPipe()) page: number,
  ) {
    return this.noticeService.getNoticeBySearch(keyword, page);
  }

  @Get("/news")
  @ApiOperation({
    summary: "가정통신문 목록 API",
    description: "가정통신문 목록을 객체로 반환",
  })
  @ApiQuery({ name: "page", type: Number, required: true })
  @ApiQuery({ name: "size", type: Number, required: false })
  @ApiResponse({ status: 200, type: [NoticeListResponse] })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  getNoticeNewsList(
    @Query("page", new ParseIntPipe()) page: number,
    @Query("size") size: number
  ) {
    return this.noticeService.getNoticeNewsList(page, size || 6);
  }

  @Get("/news/search")
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "가정통신문 검색 API",
    description: "해당하는 키워드의 가정통신문 목록을 객체로 반환",
  })
  @ApiQuery({
    name: "q",
    type: String,
    required: true,
    description: "검색할 키워드",
  })
  @ApiQuery({ name: "page", type: Number, required: true })
  @ApiResponse({ status: 200, type: [NoticeListResponse] })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  getNoticeNewsBySearch(
    @Query("q") keyword: string,
    @Query("page", new ParseIntPipe()) page: number,
  ) {
    return this.noticeService.getNoticeNewsBySearch(keyword, page);
  }

  @Get("/:notice_id")
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "공지사항, 가정통신문 정보 API",
    description: "공지사항, 가정통신문의 정보와 최상위 댓글들을 객체로 반환",
  })
  @ApiResponse({ status: 200, type: NoticeInfoResponse })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  getNoticeInfo(@Param("notice_id", new ParseIntPipe()) notice_id: number) {
    return this.noticeService.getNoticeInfo(notice_id);
  }

  @Get("/:comment_id/comment")
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "가정통신문, 공지사항 대댓글 목록 API",
    description: "댓글에 달린 대댓글 목록을 객체로 반환",
  })
  @ApiResponse({ status: 200, type: [NoticeCommentResponse] })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  getLargeComment(@Param("comment_id", new ParseIntPipe()) comment_id: number) {
    return this.noticeService.getLargeComment(comment_id);
  }

  @Post("/:notice_id/comment")
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "댓글 작성 API",
    description: "성공 시 상태 코드 201 반환",
  })
  @ApiBody({ type: NoticeCommentRequest, required: true })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  async addNoticeComment(
    @Body() body: NoticeCommentRequest,
    @Param("notice_id", new ParseIntPipe()) notice_id,
    @Auth("email") email: string,
  ) {
    await this.noticeService.addNoticeComment(body, notice_id, email);
    return {
      message: "add comment success",
    };
  }
}
