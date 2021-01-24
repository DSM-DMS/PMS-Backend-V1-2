import { BadRequestException } from "@nestjs/common";
import { EntityRepository, getCustomRepository, QueryRunner, Repository } from "typeorm";
import { MealCrawlDto } from "../event.meal.dto";
import { Meal } from "./meal.entity";

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {
  static getQueryRepository() {
    return getCustomRepository(MealRepository);
  }

  private newMeal: Meal;
  private async setCorrectColumn(mealDto: MealCrawlDto) {
    if(mealDto.time === "조식") {
      this.newMeal.breakfast_img = mealDto.url;
    } else if(mealDto.time === "중식") {
      this.newMeal.lunch_img = mealDto.url;
    } else {
      this.newMeal.dinner_img = mealDto.url;
    }
  }

  public async getOneByDatetimeWithPicture(datetime: string): Promise<Meal> {
    const meal: Meal = await this.createQueryBuilder("meal")
    .select("meal.breakfast_img", "breakfast")
    .addSelect("meal.lunch_img", "lunch")
    .addSelect("meal.dinner_img", "dinner")
    .where("meal.datetime = :datetime", { datetime })
    .getRawOne();
    if(!meal) {
      throw new BadRequestException("Not found meal pictures");
    } else {
      return meal;
    }
  }

  public async setCrawlingData(mealDto: MealCrawlDto) {
    const queryRunner: QueryRunner = this.queryRunner;
    await queryRunner.startTransaction();
    this.newMeal = new Meal();
    try {
      this.newMeal.datetime = mealDto.date;
      await this.setCorrectColumn(mealDto);
      queryRunner.manager.save(this.newMeal);
      await queryRunner.commitTransaction();
    } catch(err) {
      const meal: Meal = await this.findOne({ where: { datetime: mealDto.date } });
      this.newMeal = meal;
      await this.setCorrectColumn(mealDto);
      await queryRunner.manager.save(this.newMeal);
    } finally {
      await queryRunner.release();
    }
  }
}