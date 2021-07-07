import { Module } from "@nestjs/common";
import { GalleryController } from "./gallery.controller";
import { GalleryService } from "./gallery.service";

@Module({
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
