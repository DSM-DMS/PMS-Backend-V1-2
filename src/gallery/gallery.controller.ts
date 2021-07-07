import { ParseIntPipe, Query, Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GalleryListResponse } from "./dto/response/gallery-list.response";
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
  @ApiResponse({ status: 200, type: [GalleryListResponse] })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  public getGalleryList(
    @Query("page", new ParseIntPipe()) page: number,
    @Query("size", new ParseIntPipe()) size: number,
  ) {
    return this.galleryService.getGalleryList(page, size);
  }
}
