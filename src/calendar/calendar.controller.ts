import { Controller, Get } from "@nestjs/common";
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
} from "@nestjs/swagger";
import { CalendarService } from "./calendar.service";
import { CalendarResponse } from "./type/calendar.type";

@ApiTags("calendar")
@Controller("calendar")
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  @ApiOperation({
    summary: "학교 일정 API",
    description: "학교 일정 목록을 리스트로 반환",
  })
  @ApiResponse({ status: 200, type: CalendarResponse })
  @ApiConsumes("application/json")
  public getCalendar() {
    return this.calendarService.getCalendar();
  }
}
