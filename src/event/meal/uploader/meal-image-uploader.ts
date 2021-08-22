import { EntityManager } from "typeorm";
import { ImageUploader } from "../../../shared/image/abstract/image.uploader";
import { Meal } from "../entity/meal.entity";

export class MealImageUploader extends ImageUploader {
  public filePath: string;
  public entityManager: EntityManager;
  public meal: Meal;
  public type: string;

  // abstract method
  public findDsmKrFilePath() {
    return this.filePath;
  }

  // abstract method
  public async patchFilePath(fileLocation: string) {
    this.meal[this.type] = fileLocation;
    await this.entityManager.save(Meal, this.meal);
  }
}
