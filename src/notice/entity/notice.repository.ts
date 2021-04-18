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
}