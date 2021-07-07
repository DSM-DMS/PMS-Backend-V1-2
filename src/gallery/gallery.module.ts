import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GalleryRepository } from "./entity/gallery.repository";
import { GalleryController } from "./gallery.controller";
import { GalleryService } from "./gallery.service";

@Module({
  imports: [TypeOrmModule.forFeature([GalleryRepository])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
