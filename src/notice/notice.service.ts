import { Injectable } from "@nestjs/common";
import { NoticeRepository } from "./entity/notice.repository";
import { NoticeResObj } from "./dto/notice.dto";

@Injectable()
export class NoticeService {
  constructor(private noticeRepository: NoticeRepository) {}

  public getNoticeList(): Promise<NoticeResObj[]> {
    return this.noticeRepository.getNoticeList();
  }
}
