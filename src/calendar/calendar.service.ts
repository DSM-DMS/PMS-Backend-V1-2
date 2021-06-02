import { Injectable } from "@nestjs/common";
import { CalendarDataFactory } from "./parser/calendar";
import { Calendar } from "./type/calendar.type";

@Injectable()
export class CalendarService {
  private calendar: CalendarDataFactory;
  constructor() {
    this.calendar = new CalendarDataFactory();
  }

  public getCalendar(): Promise<Calendar> {
    return this.calendar.getParsingData();
  }
}
