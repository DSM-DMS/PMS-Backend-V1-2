import {
  ParseIntPipe,
  Query,
  Controller,
  Get,
  Param,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/shared/authentication/auth.guard";
import { GalleryInfo } from "./dto/response/gallery-info.response";
import { GalleryList } from "./dto/response/gallery-list.response";
import { GalleryService } from "./gallery.service";

@ApiTags("gallery")
@Controller("gallery")
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Get("/")
  @ApiOperation({
    summary: "앨범 목록 API",
    description: "사진앨범 목록을 객체로 반환",
  })
  @ApiQuery({ name: "page", type: Number, required: true })
  @ApiQuery({ name: "size", type: Number, required: true })
  @ApiResponse({ status: 200, type: GalleryList })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  public getGalleryList(
    @Query("page", new ParseIntPipe()) page: number,
    @Query("size", new ParseIntPipe()) size: number,
  ) {
    return this.galleryService.getGalleryList(page, size);
  }

  @Get("/:gallery_id")
  @ApiOperation({
    summary: "앨범 정보 API",
    description: "사진앨범 정보를 객체로 반환",
  })
  @ApiParam({ name: "gallery_id", required: true, type: Number })
  @ApiResponse({ status: 200, type: GalleryInfo })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  public getGalleryInfo(
    @Param(
      "gallery_id",
      new ParseIntPipe({
        exceptionFactory: () => new BadRequestException("invalid"),
      }),
    )
    gallery_id: number,
  ) {
    return this.galleryService.getGalleryInfo(gallery_id);
  }

  @Get("/search")
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "사진앨범 검색 API",
    description: "해당하는 키워드의 사진앨범 목록을 객체로 반환",
  })
  @ApiQuery({
    name: "q",
    type: String,
    required: true,
    description: "검색할 키워드",
  })
  @ApiResponse({ status: 200, type: [GalleryList] })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiResponse({ status: 403, description: "접근 권한 없음" })
  public searchGallery(@Query("q") keyword: string) {
    return this.searchGallery(keyword);
  }
}
