import * as schedule from "node-schedule";
import { JobScheduler } from "src/shared/schedule/schedule.type";
import { Notice } from "../entity/notice.entity";
import { NoticeRepository } from "../entity/notice.repository";
import { NoticeCrawlDataParser } from "../crawl/notice.crawl";
import { NoticeCrawlData } from '../type/notice.type';

export class NoticeJobScheduler extends JobScheduler {
  private noticeDataParser = NoticeCrawlDataParser.getInstance();

  public setShedule() {
    schedule.scheduleJob("0 0 12 * * *", async () => {
      const noticeCrawlData: NoticeCrawlData = await this.noticeDataParser.getParsingData();
      const exNotice: Notice = await NoticeRepository.getQueryRepository().findOne({ where: { title: noticeCrawlData.title } });
      if(exNotice) return;
      else this.noticeDataParser.setParsingData(noticeCrawlData);
    });
  }
}