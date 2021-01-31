import { Injectable } from '@nestjs/common';
import { CalendarDataFactory } from './calendar';
import { Calendar } from './calendar.type';

@Injectable()
export class CalendarService {
  private calendar: CalendarDataFactory;
  constructor() {
    this.calendar = new CalendarDataFactory();
  }

  public async getCalendar(): Promise<Calendar> {
    return await this.calendar.getCalender();
  }
}
