import { Logger } from "@nestjs/common";
import axios from "axios";
import * as cheerie from "cheerio";
import { DataParser } from "../../shared/parent/parser.type";
import { MealRepository } from "./entity/meal.repository";
import { MealCrawlData } from "./meal.type";

export class MealCrawlDataParser extends DataParser<MealCrawlData> {
  private DSMHS_URL: string = `https://dsmhs.djsch.kr`;
  
  private numberPad(n: string, width: number): string {
    n = `${n}`;
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

  private async getImageSrc(boardSeq: string, pageNumber: number): Promise<string> {
    try {
      const { data } = await axios.get(`${this.DSMHS_URL}/boardCnts/view.do?boardID=54798&boardSeq=${boardSeq}&lev=0&searchType=null&statusYN=W&page=${pageNumber}&pSize=10&s=dsmhs&m=020504&opType=N`);
      const $: any = cheerie.load(data);
      return $("img")[5].attribs.src;
    } catch(err) {
      Logger.error(err);
    }
  }

  private async deserializeOnePageData(meals: MealCrawlData[]): Promise<MealCrawlData[]> {
    const year: number = (new Date()).getFullYear();
    meals.forEach(meal => {
      const monthAndDay: string[] = meal.date.match(/[0-9]+/g);
      const time: string[] = meal.date.match(/.식/g);
      meal.date = `${year}${this.numberPad(monthAndDay[0], 2)}${this.numberPad(monthAndDay[1], 2)}`;
      meal.time = time[0];
    });
    return meals;
  }

  public async getParsingData(): Promise<MealCrawlData> {
    try {
      const { data: extractionData } = await axios.get(`${this.DSMHS_URL}/boardCnts/list.do?type=default&page=1&m=020504&s=dsmhs&boardID=54798`);
      const $: any = cheerie.load(extractionData);  // html loading
      const mealTitles: string[] = $(".link").text().split("\n");  // select '.link' class and extract innerText
      const extractionMonthAndDay: string[] = mealTitles[31].match(/[0-9]+/g);  // get last post title
      const boardSeq: string = $(".link")[0].childNodes[1].attribs.onclick.toString().match(/[0-9]+/g)[1]; // extract img source url paramter
      return { 
        date: `${(new Date()).getFullYear()}${this.numberPad(extractionMonthAndDay[0], 2)}${this.numberPad(extractionMonthAndDay[1], 2)}`,  // deserialize title to yyyymmdd
        url: `${this.DSMHS_URL}${await this.getImageSrc(boardSeq, 1)}`,  // extract image source 
        time: mealTitles[31].match(/.식/g)[0], 
      }
    } catch(err) {
      Logger.error(err);
    }
  }

  public async getMealOnOnePage(pageNumber: number): Promise<MealCrawlData[]> {
    try {
      const result: MealCrawlData[] = [];
      const { data } = await axios.get(`${this.DSMHS_URL}/boardCnts/list.do?type=default&page=${pageNumber}&m=020504&s=dsmhs&boardID=54798`);
      const $: any = cheerie.load(data);
      const mealTitles: string[] = $(".link").text().split("\n");
      const startIndex: number = mealTitles.length - 10;
      for(let i=0; i<10; i++) {
        const boardSeq: string = $(".link")[i].childNodes[1].attribs.onclick.toString().match(/[0-9]+/g)[1];
        result.push({ 
          date: mealTitles[startIndex + i], 
          url: `${this.DSMHS_URL}${await this.getImageSrc(boardSeq, pageNumber)}` 
        });
      }
      return await this.deserializeOnePageData(result);
    } catch(err) {
      Logger.error(err);
    }
  }

  public async setParsingData(meal: MealCrawlData): Promise<boolean> {
    try {
      await MealRepository.getQueryRepository().setCrawlingData(meal);
      return true;
    } catch(err) {
      Logger.error(err);
      return false;
    }
  }

  public async setMealOnOnePage(meals: MealCrawlData[]) {
    try {
      for(let meal of meals) {
        await MealRepository.getQueryRepository().setCrawlingData(meal);
      }
      return true;
    } catch(err) {
      Logger.error(err);
      return false;
    }
  }
}