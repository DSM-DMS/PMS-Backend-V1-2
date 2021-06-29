import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Notice } from "./entity/notice.entity";
import { Comment } from "./comment/comment.entity";
import { NoticeRepository } from "./entity/notice.repository";
import { CommentRepository } from "./comment/comment.repository";
import { NoticeListResponse } from "./dto/response/notice-list.response";
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
  ) {}

  // 공지사항
  public getNoticeList(page: number, size: number): Promise<NoticeListResponse[]> {
    return this.noticeRepository.findAllNotice(page, size);
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
  public getNoticeNewsList(page: number, size: number): Promise<NoticeListResponse[]> {
    return this.noticeRepository.findAllNoticeNews(page, size);
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

  public async addNoticeComment(
    body: NoticeCommentRequest,
    notice_id: number,
    email: string,
  ): Promise<Comment> {
    const findNoticePromise: Promise<Notice> = this.noticeRepository.findOne(
      notice_id,
    );
    const findUserPromise: Promise<Parent> = this.userService.findUser(email);
    const notice: Notice = await findNoticePromise;
    const user: Parent = await findUserPromise;
    let parent_comment: Comment = null;
    if (!notice) {
      throw new BadRequestException("Not Found Notice");
    }
    if (this.userService.checkAdminUser(user)) {
      throw new ForbiddenException("Fobidden user");
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
    const comment: Comment = new Comment();
    comment.user = user;
    comment.notice = notice;
    comment.body = body.body;
    comment.parent_comment = parent_comment;
    comment.depth = parent_comment ? parent_comment.depth + 1 : 0;
    return comment.save();
  }
}
