import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { NoticeList } from "../dto/response/notice-list.response";
import { Notice } from "./notice.entity";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  static getQueryRepository() {
    return getCustomRepository(NoticeRepository);
  }

  // 공지사항
  public findAllNotice(page: number, size: number): Promise<NoticeList[]> {
    return this.createQueryBuilder("notice")
      .select("notice.id")
      .addSelect("notice.upload-date")
      .addSelect("notice.title")
      .addSelect("notice.writer")
      .offset(page * size)
      .limit(size)
      .where("notice.type = 'COMMON'")
      .orderBy("notice.upload-date", "DESC")
      .getMany();
  }

  public findById(notice_id: number): Promise<Notice> {
    return this.createQueryBuilder("notice")
      .select("notice.id")
      .addSelect("notice.upload-date")
      .addSelect("notice.title")
      .addSelect("notice.writer")
      .addSelect("notice.body")
      .addSelect("attach.name")
      .addSelect("attach.download")
      .leftJoin("notice.attach", "attach")
      .where("notice.id = :id", { id: notice_id })
      .getOne();
  }

  public findByKeyword(keyword: string): Promise<NoticeList[]> {
    return this.createQueryBuilder("notice")
      .select("notice.id")
      .addSelect("notice.upload-date")
      .addSelect("notice.title")
      .addSelect("notice.writer")
      .where("notice.type = 'COMMON'")
      .andWhere(`notice.title like '%${keyword}%'`)
      .orderBy("notice.upload-date", "DESC")
      .getMany();
  }

  // 가정통신문
  public findAllNoticeNews(page: number, size: number): Promise<NoticeList[]> {
    return this.createQueryBuilder("notice")
      .select("notice.id")
      .addSelect("notice.upload-date")
      .addSelect("notice.title")
      .addSelect("notice.writer")
      .offset(page * size)
      .limit(size)
      .where("notice.type = 'NEWS'")
      .orderBy("notice.upload-date", "DESC")
      .getMany();
  }

  public findByNewsKeyword(keyword: string): Promise<NoticeList[]> {
    return this.createQueryBuilder("notice")
      .select("notice.id")
      .addSelect("notice.upload-date")
      .addSelect("notice.title")
      .addSelect("notice.writer")
      .where("notice.type = 'NEWS'")
      .andWhere(`notice.title like '%${keyword}%'`)
      .orderBy("notice.upload-date", "DESC")
      .getMany();
  }
}
