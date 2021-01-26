import axios from "axios";
import * as cheerie from "cheerio";
import { MealCrawlDto } from "./meal.dto";
import { AbstractGetMealDateFactory } from "./meal.type";

export class CrwalingMealDataFactory extends AbstractGetMealDateFactory {
  private DSMHS_URL: string = `https://dsmhs.djsch.kr`;
  
  private numberPad(n: string, width: number): string {
    n = `${n}`;
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

  private async getImageSrc(boardSeq: string, pageNumber: number): Promise<string> {
    const { data } = await axios.get(`${this.DSMHS_URL}/boardCnts/view.do?boardID=54798&boardSeq=${boardSeq}&lev=0&searchType=null&statusYN=W&page=${pageNumber}&pSize=10&s=dsmhs&m=020504&opType=N`);
    const $: any = cheerie.load(data);
    return $("img")[5].attribs.src;
  }

  private async deserializeAndSaveMealData(meals: MealCrawlDto[]): Promise<MealCrawlDto[]> {
    const year: number = (new Date()).getFullYear();
    meals.forEach(meal => {
      const monthAndDay: string[] = meal.date.match(/[0-9]+/g);
      const time: string[] = meal.date.match(/.식/g);
      meal.date = `${year}${this.numberPad(monthAndDay[0], 2)}${this.numberPad(monthAndDay[1], 2)}`;
      meal.time = time[0];
    });
    return meals;
  }

  public async getMealOnOnePage(pageNumber: number) {
    const result: MealCrawlDto[] = [];
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
    return await this.deserializeAndSaveMealData(result);
  }

  public async getLatestMeal() :Promise<MealCrawlDto> {
    const { data } = await axios.get(`${this.DSMHS_URL}/boardCnts/list.do?type=default&page=1&m=020504&s=dsmhs&boardID=54798`);
    const $: any = cheerie.load(data);
    const mealTitles: string[] = $(".link").text().split("\n");
    const startIndex: number = mealTitles.length - 10;
    const boardSeq: string = $(".link")[0].childNodes[1].attribs.onclick.toString().match(/[0-9]+/g)[1];
    return { 
      date: mealTitles[startIndex], 
      url: `${this.DSMHS_URL}${await this.getImageSrc(boardSeq, 1)}`,
      time: mealTitles[startIndex].match(/.식/g)[0],
    }
  }
}