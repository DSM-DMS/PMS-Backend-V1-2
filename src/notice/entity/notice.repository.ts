import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { NoticeInfoResObj } from "../dto/notice.dto";
import { Notice } from "./notice.entity";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  static getQueryRepository() {
    return getCustomRepository(NoticeRepository);
  }

  public getNoticeList(): Promise<Notice[]> {
    return this.createQueryBuilder("notice")
    .select("notice.id")
    .addSelect("notice.update-date")
    .addSelect("notice.title")
    .getMany();
  }
}