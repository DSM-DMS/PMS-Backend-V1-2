import { AbstractCalendarDataFactory, Calendar } from "../type/calendar.type";
import axios from "axios";

export class CalendarDataFactory extends AbstractCalendarDataFactory {
  constructor() {
    super();
    this.setCalendar();
  }

  private subString(str: string): string {
    // yyymmdd to yyyy-mm-dd
    return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`;
  }

  public async setCalendar(): Promise<void> {
    const { data } = await axios.get(this.getUrl());
    if(!data.SchoolSchedule) {
      return;
    }
    const schoolEvents: any[] = data.SchoolSchedule[1].row;
    schoolEvents.forEach(event => {
      const ymd: string = this.subString(event.AA_YMD);
      const eventOnTheYMD: string[] = this.calendar[ymd];
      this.calendar[ymd] = eventOnTheYMD ? eventOnTheYMD : [];
      this.calendar[ymd].push(event.EVENT_NM); 
    });
    this.fromYMD = (+(schoolEvents[schoolEvents.length - 1].AA_YMD) + 1).toString();
  }

  public async getCalender(): Promise<Calendar> {
    return this.calendar;
  }
}