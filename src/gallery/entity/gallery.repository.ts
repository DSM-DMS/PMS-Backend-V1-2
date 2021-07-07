import { EntityRepository, Repository } from "typeorm";
import { Gallery } from "./gallery.entity";

@EntityRepository(Gallery)
export class GalleryRepository extends Repository<Gallery> {
  public findWithPageAndSize() {
    return this.createQueryBuilder("gallery")
      .select("gallery.id")
      .addSelect("gallery.upload-date")
      .addSelect("gallery.title")
      .leftJoinAndMapOne("gallery.thumbnail", "gallery.attach", "attach")
      .orderBy("gallery.upload-date", "DESC")
      .getMany();
  }
}
