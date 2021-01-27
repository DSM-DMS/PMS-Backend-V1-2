import { BadRequestException } from "@nestjs/common";
import { EntityRepository, getCustomRepository, QueryRunner, Repository } from "typeorm";
import { MealCrawlDto, MealResponseData } from "../meal.dto";
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

  public async getOneByDatetimeWithPicture(datetime: string): Promise<MealResponseData> {
    const meal: MealResponseData = await this.createQueryBuilder("meal")
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

  public async setCrawlingData(mealDto: MealCrawlDto): Promise<Meal> {
    this.newMeal = await this.findOne({ where: { datetime: mealDto.date } });
    if(this.newMeal && this.newMeal.breakfast_img && this.newMeal.dinner_img && this.newMeal.lunch_img) {
      return this.newMeal;
    } else if(this.newMeal) {
      await this.setCorrectColumn(mealDto);
      return await this.manager.save(this.newMeal);
    } else {
      this.newMeal = new Meal();
      this.newMeal.datetime = mealDto.date;
      await this.setCorrectColumn(mealDto);
      return await this.manager.save(this.newMeal);
    }
  }
}