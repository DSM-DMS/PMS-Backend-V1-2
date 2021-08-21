import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Notice } from "./entity/notice.entity";
import { Comment } from "./comment/comment.entity";
import { NoticeRepository } from "./entity/notice.repository";
import { CommentRepository } from "./comment/comment.repository";
import {
  NoticeList,
  NoticeListResponse,
} from "./dto/response/notice-list.response";
import { NoticeInfoResponse } from "./dto/response/notice-info.response";
import { NoticeCommentResponse } from "./dto/response/notice-comment.response";
import { NoticeCommentRequest } from "./dto/request/notice-comment.request";
import { Parent, ParentService } from "../shared/parent/interface";
import { PARENT_SERVICE_TOKEN } from "../shared/parent/parent.module";

@Injectable()
export class NoticeService {
  constructor(
    private noticeRepository: NoticeRepository,
    private commentRepository: CommentRepository,
    @Inject(PARENT_SERVICE_TOKEN)
    private userService: ParentService,
  ) {
    this.noticeRepository
      .find({ type: "COMMON" })
      .then((n) => (this.noticeLength = n.length));
    this.noticeRepository
      .find({ type: "NEWS" })
      .then((n) => (this.noticeNewsLength = n.length));
  }

  private noticeLength: number;
  private noticeNewsLength: number;

  // 공지사항
  public async getNoticeList(
    page: number,
    size: number,
  ): Promise<NoticeListResponse> {
    const notices: NoticeList[] = await this.noticeRepository.findAllNotice(
      page,
      size,
    );
    return {
      notices,
      total_page: Math.ceil(this.noticeLength / size),
    };
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

  public async getNoticeBySearch(keyword: string): Promise<NoticeList[]> {
    if (!keyword) {
      throw new BadRequestException("Invalid Parameter");
    }
    return this.noticeRepository.findByKeyword(keyword);
  }

  // 가정통신문
  public async getNoticeNewsList(
    page: number,
    size: number,
  ): Promise<NoticeListResponse> {
    const notices: NoticeList[] = await this.noticeRepository.findAllNoticeNews(
      page,
      size,
    );
    return {
      notices,
      total_page: Math.ceil(this.noticeNewsLength / size),
    };
  }

  public async getNoticeNewsBySearch(keyword: string): Promise<NoticeList[]> {
    if (!keyword) {
      throw new BadRequestException("Invalid Parameter");
    }
    return this.noticeRepository.findByNewsKeyword(keyword);
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

  public async addNoticeComment(
    body: NoticeCommentRequest,
    notice_id: number,
    email: string,
  ): Promise<Comment> {
    const findNoticePromise: Promise<Notice> =
      this.noticeRepository.findOne(notice_id);
    const findUserPromise: Promise<Parent> = this.userService.findUser(email);
    const notice: Notice = await findNoticePromise;
    const user: Parent = await findUserPromise;
    let parent_comment: Comment = null;
    if (!notice) {
      throw new BadRequestException("Not Found Notice");
    }
    if (body.comment_id) {
      const exComment: Comment = await this.commentRepository.findOne(
        body.comment_id,
      );
      if (!exComment) {
        throw new BadRequestException("Not Found Comment");
      }
      parent_comment = exComment;
    }
    return this.commentRepository
      .create({
        user,
        notice,
        body: body.body,
        parent_comment,
        depth: parent_comment ? parent_comment.depth + 1 : 0,
      })
      .save();
  }
}
