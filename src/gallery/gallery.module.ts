import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageModule } from "../shared/image/image.module";
import { GalleryRepository } from "./entity/gallery.repository";
import { GalleryController } from "./gallery.controller";
import { GalleryService } from "./gallery.service";
import { GalleryImageUplodaer } from "./uploader/gallery-image.uploader";

@Module({
  imports: [
    TypeOrmModule.forFeature([GalleryRepository]),
    ImageModule.register(GalleryImageUplodaer),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
