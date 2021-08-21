import { ImageUploader } from "../../..//shared/image/abstract/image.uploader";

export class MealImageUploader extends ImageUploader {
  // abstract method
  public findDsmKrFilePath() {
    return null;
  }

  // abstract method
  public async patchFilePath(fileLocation: string) {}
}
