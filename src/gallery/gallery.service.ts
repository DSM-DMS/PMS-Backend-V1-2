import { BadRequestException, Injectable } from "@nestjs/common";
import { GalleryInfoResponse } from "./dto/response/gallery-info.response";
import { GalleryListResponse } from "./dto/response/gallery-list.response";
import { Gallery } from "./entity/gallery.entity";
import { GalleryRepository } from "./entity/gallery.repository";

@Injectable()
export class GalleryService {
  constructor(private galleryRepository: GalleryRepository) {
    galleryRepository.find().then((g) => {
      this.galleryTotalLength = g.length;
    });
  }

  private galleryTotalLength: number;

  public async getGalleryList(
    page: number,
    size: number,
  ): Promise<GalleryListResponse> {
    if (!size || size > this.galleryTotalLength) {
      throw new BadRequestException("Invalid Parameter");
    }
    const galleries: Gallery[] = await this.galleryRepository.findWithPageAndSize();
    return {
      galleries: galleries.splice(page * 4, size).map((gallery: Gallery) => ({
        ...gallery,
        thumbnail: gallery.thumbnail.file_name,
      })),
      totalLength: this.galleryTotalLength,
    };
  }

  public async getGalleryInfo(
    gallery_id: number,
  ): Promise<GalleryInfoResponse> {
    const gallery: Gallery = await this.galleryRepository.findById(gallery_id);
    if (!gallery) {
      throw new BadRequestException("Invalid Parameter");
    }
    return {
      gallery: {
        ...gallery,
        attach: gallery.attach.map((a) => a.file_name),
        thumbnail: gallery.thumbnail.file_name,
      },
    };
  }
}
