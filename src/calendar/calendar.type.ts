export interface Calendar {
  [date: string]: string[];
}

export abstract class AbstractCalendarDataFactory {
  protected readonly apiKey: string;
  protected fromYMD: string;
  protected toYMD: string;
  protected calendar: Calendar;

  protected getUrl() {
    return `https://open.neis.go.kr/hub/SchoolSchedule?ATPT_OFCDC_SC_CODE=G10&SD_SCHUL_CODE=7430310&Type=json&KEY=${this.apiKey}&pIndex=1&pSize=500&AA_FROM_YMD=${this.fromYMD}&AA_TO_YMD=${this.toYMD}`;
  }

  constructor() {
    this.apiKey = "1415344e6da54ac0b5a628508f289629";//process.env.NEIS_API_KEY;
    this.fromYMD = "20210101";
    this.toYMD = "20211231";
    this.calendar = {};
  }

  abstract setCalendar(): Promise<void>;
  abstract getCalender(): Promise<Calendar>;
}