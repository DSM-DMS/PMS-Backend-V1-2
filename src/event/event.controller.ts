import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from "@nestjs/swagger";
import { Auth } from "../shared/authentication/auth.decorator";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { EventService } from './event.service';
import { multerUploadOption } from "./event.type";
import { UploadPictureDto, UploadPictureResponseData } from "./meal/meal.dto";

@ApiTags("event")
@ApiHeader({ name: "Authorization", required: true })
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
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UploadPictureDto })
  uploadMealPicture(
    @UploadedFile() file: Express.Multer.File, 
    @Auth("email") email: string, 
    @Body() body: UploadPictureDto): Promise<UploadPictureResponseData> {
    return this.eventService.setPictureOnTheDay(file, email, body);
  }

  @Get("/meal/:datetime")
  @UseGuards(new AuthGuard())
  async showMealLists(@Param("datetime") datetime: string) {
    return this.eventService.getMealListsOnTheDay(datetime);
  }
}
