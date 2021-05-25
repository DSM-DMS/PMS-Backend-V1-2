import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { NoticeResObj } from "../dto/notice.dto";
import { Notice } from "./notice.entity";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  static getQueryRepository() {
    return getCustomRepository(NoticeRepository);
  }

  public getNoticeList(): Promise<NoticeResObj[]> {
    return this.createQueryBuilder("notice")
      .select("notice.id")
      .addSelect("notice.upload-date")
      .addSelect("notice.title")
      .getMany();
  }

  public getNoticeInfo(notice_id: number): Promise<Notice> {
    return this.createQueryBuilder("notice")
      .select("notice.id")
      .addSelect("notice.upload-date")
      .addSelect("notice.title")
      .addSelect("notice.body")
      .addSelect("attach.file_name")
      .addSelect("comment.id")
      .addSelect("comment.upload-date")
      .addSelect("comment.body")
      .addSelect("user.email")
      .addSelect("user.name")
      .addSelect("user.user_role")
      .leftJoin("notice.attach", "attach")
      .leftJoin("notice.comment", "comment")
      .leftJoin("comment.user", "user")
      .where("notice.id = :id", { id: notice_id })
      .getOne();
  }
}
