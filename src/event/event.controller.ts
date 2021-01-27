import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { EventService } from './event.service';

@Controller("event")
export class EventController {
  constructor(private eventService: EventService) {}

  @Get("/meal/picture/:datetime")
  @UseGuards(new AuthGuard())
  showMealPictures(@Param("datetime") datetime: string) {
    return this.eventService.getPicturesOnTheDay(datetime);
  }
}
