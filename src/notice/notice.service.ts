import { Injectable } from "@nestjs/common";
import { NoticeRepository } from "./entity/notice.repository";
import { NoticeInfoResObj } from "./notice.dto";

@Injectable()
export class NoticeService {
  constructor(private noticeRepository: NoticeRepository) {}

  public async getNoticeList(): Promise<NoticeInfoResObj[]> {
    const notices = await this.noticeRepository.createQueryBuilder("notice")
    .getMany();
    return notices.map(notice => {
      return { ... notice, attach: [], comment: [] }
    });
  }
}
