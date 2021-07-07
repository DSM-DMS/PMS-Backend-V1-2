import { EntityRepository, Repository } from "typeorm";
import { Gallery } from "./gallery.entity";

@EntityRepository(Gallery)
export class GalleryRepository extends Repository<Gallery> {
  public findWithPageAndSize(page: number, size: number) {
    return this.createQueryBuilder("gallery")
      .select("gallery.id")
      .addSelect("gallery.upload-date")
      .addSelect("gallery.title")
      .offset(page)
      .limit(size)
      .leftJoinAndMapOne("gallery.thumbnail", "gallery.attach", "attach")
      .getMany();
  }
}
