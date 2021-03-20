import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiHeader, ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from "@nestjs/swagger";
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
  @ApiOperation({ summary: "급식 사진 API",  description: "급식 사진 목록을 객체로 반환" })
    @ApiResponse({ status: 200, type: MealResponseData })
    @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
    @ApiResponse({ status: 400, description: "급식 목록이 없음" })
  @ApiConsumes("application/json")
  showMealPictures(@Param("datetime") datetime: string): Promise<MealResponseData> {
    return this.eventService.getPicturesOnTheDay(datetime);
  }

  @Post("/meal/picture")
  @UseGuards(new AuthGuard())
  @UseInterceptors(FileInterceptor("file", multerUploadOption))
  @ApiOperation({ summary: "급식 사진 업로드 API", description: "성공 시 상태 코드 201 반환" })
    @ApiResponse({ status: 201, type: UploadPictureResponseData })
    @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
    @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
    @ApiResponse({ status: 403, description: "접근 권한 없음" })
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
  @ApiOperation({ summary: "급식 목록 API",  description: "급식 목록을 객체로 반환" })
    @ApiResponse({ status: 200, type: MealResponseData })
    @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiConsumes("application/json")
  async showMealLists(@Param("datetime") datetime: string): Promise<Partial<MealResponseData>> {
    return this.eventService.getMealListsOnTheDay(datetime);
  }
}
