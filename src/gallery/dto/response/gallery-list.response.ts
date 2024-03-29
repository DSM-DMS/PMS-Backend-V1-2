import { ApiProperty } from "@nestjs/swagger";

export class GalleryList {
  @ApiProperty({ example: "gallery-id" })
  id: number;

  @ApiProperty({ example: "2021-04-01" })
  "upload-date": Date;

  @ApiProperty({ example: "2020학년도 2학기 시간표 안내" })
  title: string;

  @ApiProperty({
    example: "https://dsmhs.djsch.kr/boardCnts/fileDown",
    description: "gallery 섬네일",
  })
  thumbnail: string;
}

export class GalleryListResponse {
  galleries: GalleryList[];
  total_length: number;
  total_page: number;
}
