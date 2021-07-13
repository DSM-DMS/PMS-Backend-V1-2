import { EntityManager } from "typeorm";
import { ImageUploader } from "../../shared/image/abstract/image.uploader";
import { GalleryAttach } from "../entity/gallery-attach.entity";

export class GalleryImageUplodaer extends ImageUploader {
  public filePath: string;
  public entityManager: EntityManager;
  public attach: GalleryAttach;

  // abstract method
  public findDsmKrFilePath() {
    return this.filePath;
  }

  // abstract method
  public async patchFilePath(fileLocation: string) {
    this.attach.file_name = fileLocation;
    await this.entityManager.save(GalleryAttach, this.attach);
  }
}
