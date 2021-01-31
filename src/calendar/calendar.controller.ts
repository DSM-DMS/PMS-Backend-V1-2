import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/authentication/auth.guard';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  @UseGuards(new AuthGuard())
  getCalendar() {
    return this.calendarService.getCalendar();
  }
}
