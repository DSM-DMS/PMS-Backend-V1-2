import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Connection, QueryRunner } from "typeorm";
import { ImageModule } from "../shared/image/image.module";
import { GalleryInfoResponse } from "./dto/response/gallery-info.response";
import { GalleryListResponse } from "./dto/response/gallery-list.response";
import { Gallery } from "./entity/gallery.entity";
import { GalleryRepository } from "./entity/gallery.repository";
import { GalleryImageUplodaer } from "./uploader/gallery-image.uploader";

@Injectable()
export class GalleryService {
  constructor(
    private galleryRepository: GalleryRepository,
    private connection: Connection,

    @Inject(ImageModule.LOCAL_IMAGE_UPLOADER)
    private imageUploader: GalleryImageUplodaer,
  ) {
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
    const galleries: Gallery[] =
      await this.galleryRepository.findWithPageAndSize();
    return {
      galleries: galleries
        .splice(page * size, size)
        .map((gallery: Gallery) => ({
          ...gallery,
          thumbnail: gallery.thumbnail && gallery.thumbnail.file_name,
        })),
      total_length: this.galleryTotalLength,
      total_page: Math.ceil(this.galleryTotalLength / size),
    };
  }

  public async getGalleryInfo(
    gallery_id: number,
  ): Promise<GalleryInfoResponse> {
    const gallery: Gallery = await this.galleryRepository.findById(gallery_id);
    if (!gallery) {
      throw new BadRequestException("Invalid Parameter");
    }

    gallery.attach[0] &&
      /https:\/\/dsmhs\.djsch\.kr/g.test(gallery.attach[0].file_name) &&
      this.uploadGalleryImage(gallery);

    return {
      gallery: {
        ...gallery,
        attach: gallery.attach.map((a) => a.file_name),
        thumbnail: gallery.thumbnail.file_name,
      },
    };
  }

  private async uploadGalleryImage(gallery: Gallery) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const attach of gallery.attach) {
        this.imageUploader.attach = attach;
        this.imageUploader.entityManager = queryRunner.manager;
        this.imageUploader.filePath = attach.file_name;
        await this.imageUploader.toLocalFile();
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      Logger.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
