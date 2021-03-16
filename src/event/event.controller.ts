import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiHeader, ApiTags, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { Auth } from "../shared/authentication/auth.decorator";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { EventService } from './event.service';
import { multerUploadOption } from "./event.type";
import { MealResponseData, UploadPictureDto, UploadPictureResponseData } from "./meal/meal.dto";

@ApiTags("event")
@ApiBearerAuth()
@ApiHeader({ name: "Authorization", required: true })
@Controller("event")
export class EventController {
  constructor(private eventService: EventService) {}

  @Get("/meal/picture/:datetime")
  @UseGuards(new AuthGuard())
  @ApiResponse({ status: 200, type: MealResponseData })
  @ApiConsumes("application/json")
  showMealPictures(@Param("datetime") datetime: string): Promise<MealResponseData> {
    return this.eventService.getPicturesOnTheDay(datetime);
  }

  @Post("/meal/picture")
  @UseGuards(new AuthGuard())
  @UseInterceptors(FileInterceptor("file", multerUploadOption))
  @ApiResponse({ status: 201, type: UploadPictureResponseData })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UploadPictureDto })
  uploadMealPicture(
    @UploadedFile() file: Express.Multer.File, 
    @Auth("email") email: string, 
    @Body() body: UploadPictureDto): Promise<UploadPictureResponseData> {
    return this.eventService.setPictureOnTheDay(file, email, body);
  }

  @Get("/meal/:datetime")
  @ApiResponse({ status: 200, type: MealResponseData })
  @ApiConsumes("application/json")
  @UseGuards(new AuthGuard())
  async showMealLists(@Param("datetime") datetime: string): Promise<MealResponseData> {
    return this.eventService.getMealListsOnTheDay(datetime);
  }
}
