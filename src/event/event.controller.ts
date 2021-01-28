import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Auth } from "../shared/authentication/auth.decorator";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { EventService } from './event.service';
import { multerUploadOption } from "./event.type";
import { UploadPictureDto } from "./meal/meal.dto";

@Controller("event")
export class EventController {
  constructor(private eventService: EventService) {}

  @Get("/meal/picture/:datetime")
  @UseGuards(new AuthGuard())
  showMealPictures(@Param("datetime") datetime: string) {
    return this.eventService.getPicturesOnTheDay(datetime);
  }

  @Post("/meal/picture")
  @UseGuards(new AuthGuard())
  @UseInterceptors(FileInterceptor("file", multerUploadOption))
  uploadMealPicture(
    @UploadedFile() file: Express.Multer.File, 
    @Auth("email") email: string, 
    @Body() body: UploadPictureDto) {
    return this.uploadMealPicture(file, email, body);
  }
}
