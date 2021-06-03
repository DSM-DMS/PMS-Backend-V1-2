import { Injectable } from "@nestjs/common";
import { NoticeRepository } from "./entity/notice.repository";
import { Notice } from "./entity/notice.entity";
import { Comment } from "./comment/comment.entity";
import { CommentRepository } from "./comment/comment.repository";
import { NoticeListResponse } from "./dto/response/notice-list.response";
import { NoticeInfoResponse } from "./dto/response/notice-info.response";

@Injectable()
export class NoticeService {
  constructor(
    private noticeRepository: NoticeRepository,
    private commentRepository: CommentRepository,
  ) {}

  public getNoticeList(page: number): Promise<NoticeListResponse[]> {
    return this.noticeRepository.getNoticeList(page);
  }

  public async getNoticeInfo(notice_id: number): Promise<NoticeInfoResponse> {
    const notice: Notice = await this.noticeRepository.getNoticeInfo(notice_id);
    await Promise.all(
      notice.comment.map((comment: Comment) => {
        return this.setLargeComments(comment);
      }),
    );
    return {
      ...notice,
      attach: notice.attach.map((attach) => attach.file_name),
    };
  }

  private async setLargeComments(comment: Comment) {
    const largeComments: Comment[] = await this.commentRepository.getLargeComment(
      comment.id,
    );
    if (!largeComments) {
      return;
    } else {
      comment.comment = largeComments;
      await Promise.all(
        comment.comment.map((comment: Comment) => {
          return this.setLargeComments(comment);
        }),
      );
    }
  }
}
