import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { CalendarService } from "./calendar.service";
import { ApiResponse, ApiConsumes } from "@nestjs/swagger";

@ApiTags("calendar")
@ApiHeader({ name: "Authorization", required: true })
@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  @UseGuards(new AuthGuard())
  @ApiResponse({ status: 200 })
  @ApiConsumes("application/json")
  getCalendar() {
    return this.calendarService.getCalendar();
  }
}
