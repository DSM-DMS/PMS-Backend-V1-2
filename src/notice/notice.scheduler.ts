import * as schedule from "node-schedule";
import { JobScheduler } from "src/shared/schedule/schedule.type";
import { NoticeCrawlDataParser } from "./notice.crawl";
import { NoticeCrawlData } from './notice.type';

export class NoticeJobScheduler extends JobScheduler {
  private noticeDataParser = NoticeCrawlDataParser.getInstance();

  public setShedule() {
    schedule.scheduleJob("0 0 12 * * *", async () => {
      const noticeCrawlData: NoticeCrawlData = await this.noticeDataParser.getParsingData();
      this.noticeDataParser.setParsingData(noticeCrawlData);
    });
  }
}