import { Logger } from "@nestjs/common";
import axios from "axios";
import * as cheerio from "cheerio";
import { DataParser } from "../shared/parser/parser.type";
import { NoticeRepository } from "./entity/notice.repository";
import { NoticeCrawlData } from "./notice.type";

export class NoticeCrawlDataParser extends DataParser<NoticeCrawlData> {
  private constructor() { super() };
  private static instance: NoticeCrawlDataParser;
  private DSMHS_URL: string = `https://dsmhs.djsch.kr`;
  private noticeBody: string = "";

  private getUploadDate(): string {
    const date: Date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

  private getNoticeTitle(domContent: any): string {
    try {
      return domContent.childNodes[4].childNodes[1].data;
    } catch(err) {
      Logger.error(err);
    }
  }

  private subStringNoticeBody(arr: any[]): void {
    if(!arr) { return; }
    for(let a of arr) { a.data ? this.noticeBody = `${this.noticeBody}\n${a.data}` : this.subStringNoticeBody(a.children); }
  }

  private getNoticeContentMedia(domContent: any): string[] {
    try {
      const media: string[] = [];
      for(let i=1;; i+= 4) {
        const medium = domContent.childNodes[8] ? domContent.childNodes[8].childNodes[1].childNodes[3].childNodes[i] : false;
        if(!medium) break;
        media.push(`${this.DSMHS_URL}${medium.attribs.href}`)
      }
      return media;
    } catch(err) {
      Logger.error(err);
    }
  }

  public static getInstance(): NoticeCrawlDataParser {
    return NoticeCrawlDataParser.instance || (NoticeCrawlDataParser.instance = new NoticeCrawlDataParser); 
  }

  public async getParsingData(): Promise<NoticeCrawlData> {
    try {
      const { data: pageHtml } = await axios.get("https://dsmhs.djsch.kr/boardCnts/list.do?type=default&page=1&m=0201&s=dsmhs&boardID=54793");
      let $: any = cheerio.load(pageHtml);
      const boardSeq: string = $(".link")[1].childNodes[1].attribs.onclick.toString().match(/[0-9]+/g)[1];
      const { data: noticeHtml } = await axios.get(`${this.DSMHS_URL}/boardCnts/view.do?boardID=54793&boardSeq=${boardSeq}&lev=0&searchType=null&statusYN=W&page=3&pSize=11&s=dsmhs&m=0201&opType=N`);
      $ = cheerio.load(noticeHtml);
      const boardText: any = $(".board-text")[0];
      const title: string = this.getNoticeTitle(boardText);
      this.subStringNoticeBody(boardText.childNodes[6].children);
      const body: string = this.noticeBody;
      this.noticeBody = "";
      const attach: string[] = this.getNoticeContentMedia(boardText);
      return { body, title, attach };
    } catch(err) {
      Logger.error(err);
    }
  }

  public async setParsingData(data: NoticeCrawlData) {
    try {
      await NoticeRepository.getQueryRepository().createQueryBuilder()
      .insert()
      .values([{
        title: data.title,
        body: data.body,
        "upload-date": new Date(this.getUploadDate()),
      }])
      .execute();
    } catch(err) {
      Logger.error(err);
    }
  }
}
