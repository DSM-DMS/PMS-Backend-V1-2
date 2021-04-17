import { DataParser } from "../../shared/parser/parser.type";

interface Schedule {
  [date: string]: string[];
}

export interface Calendar {
  [month: number]: Schedule;
}

export abstract class AbstractCalendarDataFactory extends DataParser<any> {
  protected readonly apiKey: string;
  protected fromYMD: string;
  protected toYMD: string;
  protected calendar: Calendar;

  protected getUrl() {
    return `https://open.neis.go.kr/hub/SchoolSchedule?ATPT_OFCDC_SC_CODE=G10&SD_SCHUL_CODE=7430310&Type=json&KEY=${this.apiKey}&pIndex=1&pSize=500&AA_FROM_YMD=${this.fromYMD}&AA_TO_YMD=${this.toYMD}`;
  }

  constructor() {
    super();
    this.apiKey = process.env.NEIS_API_KEY;
    const year: number = (new Date()).getFullYear();
    this.fromYMD = `${year}0101`;
    this.toYMD = `${year}1231`;
    this.calendar = {};
  }

  abstract setParsingData(): Promise<void>;
  abstract getParsingData(): Promise<Calendar>;
}