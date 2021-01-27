import { Controller, Get, Param } from "@nestjs/common";
import { EventService } from './event.service';

@Controller("event")
export class EventController {
  constructor(private eventService: EventService) {}

  @Get("/meal/picture/:datetime")
  showMealPictures(@Param("datetime") datetime: string) {
    return this.eventService.getPicturesOnTheDay(datetime);
  }
}
