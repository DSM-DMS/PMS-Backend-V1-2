import { EntityRepository, Repository } from "typeorm";
import { Gallery } from "./gallery.entity";

@EntityRepository(Gallery)
export class GalleryRepository extends Repository<Gallery> {
  public findWithPageAndSize(): Promise<Gallery[]> {
    return this.createQueryBuilder("gallery")
      .select("gallery.id")
      .addSelect("gallery.upload-date")
      .addSelect("gallery.title")
      .leftJoinAndMapOne("gallery.thumbnail", "gallery.attach", "attach")
      .orderBy("gallery.upload-date", "DESC")
      .getMany();
  }

  public findById(gallery_id: number): Promise<Gallery> {
    return this.createQueryBuilder("gallery")
      .leftJoinAndSelect("gallery.attach", "attach_as_files")
      .leftJoinAndMapOne(
        "gallery.thumbnail",
        "gallery.attach",
        "attach_as_thumbnail",
      )
      .where("gallery.id = :id", { id: gallery_id })
      .getOne();
  }

  public findByKeyword(keyword: string): Promise<Gallery[]> {
    return this.createQueryBuilder("gallery")
      .select("gallery.id")
      .addSelect("gallery.upload-date")
      .addSelect("gallery.title")
      .leftJoinAndMapMany("gallery.thumbnail", "gallery.attach", "attach")
      .where(`gallery.title like '%${keyword}%'`)
      .orderBy("gallery.upload-date", "DESC")
      .getMany();
  }
}
