import { BadRequestException, Injectable } from "@nestjs/common";
import { Notice } from "./entity/notice.entity";
import { Comment } from "./comment/comment.entity";
import { NoticeRepository } from "./entity/notice.repository";
import { CommentRepository } from "./comment/comment.repository";
import { NoticeListResponse } from "./dto/response/notice-list.response";
import { NoticeInfoResponse } from "./dto/response/notice-info.response";
import { NoticeCommentResponse } from "./dto/response/notice-comment.response";

@Injectable()
export class NoticeService {
  constructor(
    private noticeRepository: NoticeRepository,
    private commentRepository: CommentRepository,
  ) {}

  // 공지사항
  public getNoticeList(page: number): Promise<NoticeListResponse[]> {
    return this.noticeRepository.findAllNotice(page);
  }

  public async getNoticeInfo(notice_id: number): Promise<NoticeInfoResponse> {
    const notice: Notice = await this.noticeRepository.findById(notice_id);
    if (!notice) {
      throw new BadRequestException("Not Found Notice");
    }
    return {
      ...notice,
      comment: await this.commentRepository.findAllByNotice(notice_id),
    };
  }

  public async getNoticeBySearch(
    keyword: string,
    page: number,
  ): Promise<NoticeListResponse[]> {
    return this.noticeRepository.findByKeyword(keyword, page);
  }

  // 가정통신문
  public getNoticeNewsList(page: number): Promise<NoticeListResponse[]> {
    return this.noticeRepository.findAllNoticeNews(page);
  }

  public getNoticeNewsBySearch(
    keyword: string,
    page: number,
  ): Promise<NoticeListResponse[]> {
    return this.noticeRepository.findByNewsKeyword(keyword, page);
  }

  public async getLargeComment(
    comment_id: number,
  ): Promise<NoticeCommentResponse[]> {
    const comment: Comment = await this.commentRepository.findOne(comment_id);
    if (!comment) {
      throw new BadRequestException("Not Found Comment");
    }
    return this.commentRepository.findAllLargeComment(comment);
  }
}
