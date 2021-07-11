import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Meal } from "./meal/entity/meal.entity";
import { MealRepository } from "./meal/entity/meal.repository";
import { MealResponse } from "./meal/dto/response/meal.response";
import { UploadPictureRequest } from "./meal/dto/request/upload-picture.request";
import { UploadPictureResponse } from "./meal/dto/response/upload-picture.response";
import { DmsService, MealList } from "../shared/dms/interface";
import { DMS_SERVICE_TOKEN } from "../shared/dms/dms.module";
import { ParentService } from "../shared/parent/interface";
import { PARENT_SERVICE_TOKEN } from "../shared/parent/parent.module";

@Injectable()
export class EventService {
  constructor(
    private mealRepository: MealRepository,

    @Inject(PARENT_SERVICE_TOKEN)
    private parentService: ParentService,

    @Inject(DMS_SERVICE_TOKEN)
    private dmsMealService: DmsService,
  ) {}

  private typeList: string[] = ["breakfast", "lunch", "dinner"];

  private subString(str: string): string {
    const year: string = str.substr(0, 4);
    const month: string = str.substr(4, 2);
    const day: string = str.substr(6, 2);
    return `${year}-${month}-${day}`;
  }

  public async getPicturesOnTheDay(datetime: string): Promise<MealResponse> {
    const response: MealResponse =
      await this.mealRepository.getOneByDatetimeWithPicture(datetime);
    if (!response) {
      throw new BadRequestException("Not found meal data");
    }
    return response;
  }

  public async setPictureOnTheDay(
    file: Express.Multer.File,
    email: string,
    body: UploadPictureRequest,
  ): Promise<UploadPictureResponse> {
    if (!(await this.parentService.checkAdminUserEmail(email))) {
      throw new ForbiddenException("Fobidden user");
    }
    const meal: Meal = await this.mealRepository.getOrMakeOne(body.datetime);
    const mealcode: number = +body.mealcode;
    switch (mealcode) {
      case 1:
        meal.breakfast_img = `${process.env.SERVICE_URL}/file/meal/${file.filename}`;
        break;
      case 2:
        meal.lunch_img = `${process.env.SERVICE_URL}/file/meal/${file.filename}`;
        break;
      case 3:
        meal.dinner_img = `${process.env.SERVICE_URL}/file/meal/${file.filename}`;
        break;
      default:
        throw new BadRequestException("Bad request");
    }
    await this.mealRepository.manager.save(meal);
    return {
      location: `${process.env.SERVICE_URL}/file/meal/${file.filename}`,
    };
  }

  public async getMealListsOnTheDay(datetime: string): Promise<MealResponse> {
    const ymd: string = this.subString(datetime);
    const mealLists: MealList[] = await this.dmsMealService.findMealOnOneDay(
      ymd,
    );
    let mealResponseData: MealResponse = new MealResponse();
    this.typeList.forEach((type: string, index: number) => {
      mealResponseData[type] = mealLists[index]
        ? mealLists[index].meal.split("||")
        : "";
    });
    return mealResponseData;
  }

  public async setOneByDatetime(datetime: string): Promise<Meal> {
    const meal: Meal = this.mealRepository.create({ datetime });
    return await this.mealRepository.manager.save(meal);
  }

  public async deleteOneByDatetime(datetime: string) {
    return await this.mealRepository.delete({ datetime });
  }
}
