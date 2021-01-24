import axios from "axios";
import * as cheerie from "cheerio";
import { MealCrawlDto } from "./event.meal.dto";

const DSMHS_URL: string = `https://dsmhs.djsch.kr`;

function numberPad(n: string, width: number): string {
  n = `${n}`;
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

async function deserializeAndSaveMealData(meals: MealCrawlDto[]): Promise<void> {
  const year: number = (new Date()).getFullYear();
  meals.forEach((meal: MealCrawlDto) => {
    const monthAndDay: string[] = meal.date.match(/[0-9]+/g);
    const time: string[] = meal.date.match(/.식/g);
    meal.date = `${year}${numberPad(monthAndDay[0], 2)}${numberPad(monthAndDay[1], 2)}`;
    meal.time = time[0];
    console.log(meal);
    // meal crawling data를 받아와 처리한다
  });
}

async function getImageSrc(boardSeq: string, pageNumber: number): Promise<string> {
  const { data } = await axios.get(`${DSMHS_URL}/boardCnts/view.do?boardID=54798&boardSeq=${boardSeq}&lev=0&searchType=null&statusYN=W&page=${pageNumber}&pSize=10&s=dsmhs&m=020504&opType=N`);
  const $: any = cheerie.load(data);
  return $("img")[5].attribs.src;
}

async function crawlingMealDataWithThePage(pageNumber: number) {
  const result: MealCrawlDto[] = [];
  const { data } = await axios.get(`${DSMHS_URL}/boardCnts/list.do?type=default&page=${pageNumber}&m=020504&s=dsmhs&boardID=54798`);
  const $: any = cheerie.load(data);
  const mealTitles: string[] = $(".link").text().split("\n");
  const startIndex: number = mealTitles.length - 10;
  for(let i=0; i<10; i++) {
    const boardSeq: string = $(".link")[i].childNodes[1].attribs.onclick.toString().match(/[0-9]+/g)[1];
    result.push({ 
      date: mealTitles[startIndex + i], 
      url: `${DSMHS_URL}${await getImageSrc(boardSeq, pageNumber)}` 
    });
  }
  await deserializeAndSaveMealData(result);
}

export { crawlingMealDataWithThePage }