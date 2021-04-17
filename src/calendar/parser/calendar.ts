import { AbstractCalendarDataFactory, Calendar } from "../type/calendar.type";
import axios from "axios";

export class CalendarDataFactory extends AbstractCalendarDataFactory {
  constructor() {
    super();
    this.setParsingData();
  }

  private subString(str: string): string {
    // yyymmdd to yyyy-mm-dd
    return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`;
  }

  public async setParsingData(): Promise<void> {
    const { data } = await axios.get(this.getUrl());
    if(!data.SchoolSchedule) {
      return;
    }
    const schoolEvents: any[] = data.SchoolSchedule[1].row;
    schoolEvents.forEach(event => {
      const month: number = +event.AA_YMD.substr(4, 2);
      this.calendar[month] = this.calendar[month] ? this.calendar[month] : {};
      const ymd: string = this.subString(event.AA_YMD);
      const eventOnTheYMD: string[] = this.calendar[ymd];
      this.calendar[month][ymd] = eventOnTheYMD ? eventOnTheYMD : [];
      this.calendar[month][ymd].push(event.EVENT_NM); 
    });
    this.fromYMD = (+(schoolEvents[schoolEvents.length - 1].AA_YMD) + 1).toString();
  }

  public async getParsingData(): Promise<Calendar> {
    return this.calendar;
  }
}