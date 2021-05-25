import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiHeader,
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
  ApiOperation,
} from "@nestjs/swagger";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { CalendarService } from "./calendar.service";

@ApiTags("calendar")
@ApiBearerAuth()
@ApiHeader({ name: "Authorization", required: true })
@Controller("calendar")
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "학교 일정 API",
    description: "학교 일정 목록을 리스트로 반환",
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiConsumes("application/json")
  getCalendar() {
    return this.calendarService.getCalendar();
  }
}
