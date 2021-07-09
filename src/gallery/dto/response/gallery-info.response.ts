import { ApiProperty } from "@nestjs/swagger";

export class GalleryInfo {
  @ApiProperty({ example: "gallery-id" })
  id: number;

  @ApiProperty({ example: "2021-03-25" })
  "upload-date": Date;

  @ApiProperty({ example: "또래상담반 2021 헬로프렌즈 행사" })
  title: string;

  @ApiProperty({
    example:
      "또래상담반 2021 헬로프렌즈 행사가 3. 4.~ 3. 5.까지 운영되었습니다.",
  })
  body: string;

  @ApiProperty({
    example: "[https://dsmhs.djsch.kr/boardCnts/fileDown ...]",
    description: "첨부사진 링크들의 배열",
    type: [String],
  })
  attach: string[];

  @ApiProperty({
    example: "https://dsmhs.djsch.kr/boardCnts/fileDown",
    description: "gallery 섬네일",
  })
  thumbnail: string;
}

export class GalleryInfoResponse {
  gallery: GalleryInfo;
}
