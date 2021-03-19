import { Injectable } from "@nestjs/common";
import { CalendarDataFactory } from "./calendar";
import { Calendar } from "./calendar.type";
import * as schedule from "node-schedule";

@Injectable()
export class CalendarService {
  private calendar: CalendarDataFactory;
  constructor() {
    this.calendar = new CalendarDataFactory();
    schedule.scheduleJob("0 0 0 1 * *", this.calendar.setCalendar.bind(this.calendar));
  }

  public async getCalendar(): Promise<Calendar> {
    return await this.calendar.getCalender();
  }
}
