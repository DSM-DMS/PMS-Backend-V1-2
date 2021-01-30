import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ParentRepository } from "../shared/parent/parent.repository";
import { Meal } from "./meal/entity/meal.entity";
import { MealRepository } from "./meal/entity/meal.repository";
import { MealResponseData, UploadPictureDto, UploadPictureResponseData } from "./meal/meal.dto";
import { BreakfastMealListDataFactory, DinnerMealListDataFactory, LunchMealListDataFactory } from "./meal/meal.list";
import { MealListDataFactory } from "./meal/meal.type";

@Injectable()
export class EventService {
  private breakfast: MealListDataFactory; 
  private lunch: MealListDataFactory;
  private dinner: MealListDataFactory;
  
  constructor(private mealRepository: MealRepository, private parentRepository: ParentRepository) {
    this.breakfast = new BreakfastMealListDataFactory();
    this.lunch = new LunchMealListDataFactory();
    this.dinner = new DinnerMealListDataFactory();
  }

  public async getPicturesOnTheDay(datetime: string): Promise<MealResponseData> {
    const response: MealResponseData = await this.mealRepository.getOneByDatetimeWithPicture(datetime);
    if(!response) {
      throw new BadRequestException("Not found meal data");
    }
    return response;
  }

  public async setPictureOnTheDay(file: Express.Multer.File, email: string, body: UploadPictureDto): Promise<UploadPictureResponseData> {
    if(!(await this.parentRepository.checkAdminUserEmail(email))) {
      throw new ForbiddenException("Fobidden user");
    }
    const meal: Meal = await this.mealRepository.getOrMakeOne(body.datetime);
    if(body.mealcode === 1) {
      meal.breakfast_img = `/file/meal/${file.filename}`;
    } else if(body.mealcode === 2) {
      meal.lunch_img = `/file/meal/${file.filename}`;
    } else if(body.mealcode === 3) {
      meal.dinner_img = `/file/meal/${file.filename}`;
    } else {
      throw new BadRequestException("Bad request");
    }
    await this.mealRepository.manager.save(meal);
    return { location: `/file/meal/${file.filename}` }
  }

  public async getMealListsOnTheDay(datetime: string): Promise<MealResponseData> {
    await this.breakfast.setMealList();
    await this.lunch.setMealList();
    await this.dinner.setMealList();
    return {
      breakfast: await this.breakfast.getMeallist(datetime),
      lunch: await this.lunch.getMeallist(datetime),
      dinner: await this.dinner.getMeallist(datetime),
    }
  }

  public async setOneByDatetime(datetime: string): Promise<Meal> {
    const meal :Meal = this.mealRepository.create({ datetime });
    return await this.mealRepository.manager.save(meal);
  }

  public async deleteOneByDatetime(datetime: string) {
    return await this.mealRepository.delete({ datetime });
  }
}
