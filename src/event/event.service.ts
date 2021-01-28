import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ParentRepository } from "src/shared/parent/parent.repository";
import { Meal } from "./meal/entity/meal.entity";
import { MealRepository } from "./meal/entity/meal.repository";
import { MealResponseData, UploadPictureDto, UploadPictureResponseData } from "./meal/meal.dto";

@Injectable()
export class EventService {
  constructor(private mealRepository: MealRepository, private parentRepository: ParentRepository) {}

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
}
