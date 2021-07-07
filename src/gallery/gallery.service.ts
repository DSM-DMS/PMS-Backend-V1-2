import { BadRequestException, Injectable } from "@nestjs/common";
import { GalleryListResponse } from "./dto/response/gallery-list.response";
import { Gallery } from "./entity/gallery.entity";
import { GalleryRepository } from "./entity/gallery.repository";

@Injectable()
export class GalleryService {
  constructor(private galleryRepository: GalleryRepository) {}

  public async getGalleryList(
    page: number,
    size: number,
  ): Promise<GalleryListResponse[]> {
    if (!size) {
      throw new BadRequestException("Invalid Parameter");
    }
    const galleries: Gallery[] = await this.galleryRepository.findWithPageAndSize(
      page,
      size,
    );
    return galleries.map((gallery) => ({
      ...gallery,
      thumbnail: gallery.thumbnail.file_name,
    }));
  }
}
