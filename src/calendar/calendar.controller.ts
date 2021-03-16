import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/authentication/auth.guard';
import { CalendarService } from './calendar.service';

@ApiTags("calendar")
@ApiHeader({ name: "Authorization", required: true })
@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  @UseGuards(new AuthGuard())
  getCalendar() {
    return this.calendarService.getCalendar();
  }
}
