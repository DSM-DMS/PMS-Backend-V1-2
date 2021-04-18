import { Injectable } from "@nestjs/common";
import { NoticeRepository } from "./entity/notice.repository";
import { NoticeInfoResObj, NoticeResObj } from "./dto/notice.dto";
import { Notice } from "./entity/notice.entity";
import { Comment } from "./comment/comment.entity";
import { CommentRepository } from "./comment/comment.repository";

@Injectable()
export class NoticeService {
  constructor(
    private noticeRepository: NoticeRepository,
    private commentRepository: CommentRepository,
  ) {}

  public getNoticeList(): Promise<NoticeResObj[]> {
    return this.noticeRepository.getNoticeList();
  }

  public async getNoticeInfo(notice_id: number): Promise<NoticeInfoResObj> {
    const notice: Notice = await this.noticeRepository.getNoticeInfo(notice_id);
    await Promise.all(notice.comment.map((comment: Comment) => {
      return this.setLargeComments(comment);
    }));
    return { ...notice, attach: notice.attach.map(attach => attach.file_name) };
  }

  private async setLargeComments(comment: Comment) {
    const largeComments: Comment[] = await this.commentRepository.getLargeComment(comment.id);
    if(!largeComments) {
      return;
    } else {
      comment.comment = largeComments;
      await Promise.all(comment.comment.map((comment: Comment) => {
        return this.setLargeComments(comment);
      }));
    }
  }
}
