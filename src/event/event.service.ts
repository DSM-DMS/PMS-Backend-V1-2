import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ParentRepository } from "../shared/parent/parent.repository";
import { Meal } from "./meal/entity/meal.entity";
import { MealRepository } from "./meal/entity/meal.repository";
import { MealResponseData, UploadPictureDto, UploadPictureResponseData } from "./meal/meal.dto";
import { MealListRepository } from "src/shared/dms/dms.meal.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { MealList } from "src/shared/dms/dms.meal.entity";

const typeList: string[] = ['breakfast', 'lunch', 'dinner'];

@Injectable()
export class EventService {
  constructor(
    private mealRepository: MealRepository, 
    private parentRepository: ParentRepository,

    @InjectRepository(MealListRepository, "dmsConnection")
    private mealListRepository: MealListRepository
  ) {}

  private subString(str: string): string {
    const year: string = str.substr(0, 4);
    const month: string = str.substr(4, 2);
    const day: string = str.substr(6, 2);
    return `${year}-${month}-${day}`;
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
    const mealcode: number = +body.mealcode;
    switch (mealcode) {
      case 1:
        meal.breakfast_img = `${process.env.SERVICE_URL}/file/meal/${file.filename}`; break;
      case 2:
        meal.lunch_img = `${process.env.SERVICE_URL}/file/meal/${file.filename}`; break;
      case 3:
        meal.dinner_img = `${process.env.SERVICE_URL}/file/meal/${file.filename}`; break;
      default:
        throw new BadRequestException("Bad request");
    }
    await this.mealRepository.manager.save(meal);
    return { location: `${process.env.SERVICE_URL}/file/meal/${file.filename}` }
  }

  public async getMealListsOnTheDay(datetime: string): Promise<Partial<MealResponseData>> {
    const ymd: string = this.subString(datetime);
    const mealLists: MealList[] = await this.mealListRepository.findAll(ymd);
    let mealResponseData: Partial<MealResponseData> = {};
    typeList.forEach((type: string, index: number) => {
      mealResponseData[type] = mealLists[index] ? mealLists[index].meal.split("||") : "";
    });
    return mealResponseData;
  }

  public async setOneByDatetime(datetime: string): Promise<Meal> {
    const meal :Meal = this.mealRepository.create({ datetime });
    return await this.mealRepository.manager.save(meal);
  }

  public async deleteOneByDatetime(datetime: string) {
    return await this.mealRepository.delete({ datetime });
  }
}
