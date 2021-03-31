import axios from "axios";
import * as cheerio from "cheerio";

const TEST_URL: string = "https://dsmhs.djsch.kr";

interface Data {
  title?: string;
  body?: string;
  files?: string[];
}

let crawlData: Data[] = [];

let test = "";

function getNoticeTitle(domContent: any): string {
  return domContent.childNodes[4].childNodes[1].data;
}

function subStringNoticeBody(arr: any[]): void {
  if(!arr) { return; }
  for(let a of arr) { a.data ? test = `${test}\n${a.data}` : subStringNoticeBody(a.children); }
}

function getNoticeContentMedia(domContent: any): string[] {
  const media: string[] = [];
  for(let i=1;; i+= 4) {
    const medium = domContent.childNodes[8].childNodes[1].childNodes[3].childNodes[i];
    if(!medium) break;
    media.push(`${TEST_URL}${medium.attribs.href}`)
  }
  return media;
}

async function testFunc(url: string) {
  const { data } = await axios.get(url);
  const $: any = cheerio.load(data);
  const boardText: any = $(".board-text")[0];
  const tests: Data = {};
  tests.title = getNoticeTitle(boardText);
  subStringNoticeBody(boardText.childNodes[6].children);
  tests.body = test;
  test = "";
  tests.files = getNoticeContentMedia(boardText);
  crawlData.push(tests);
}

async function testRun() {
  const { data } = await axios.get("https://dsmhs.djsch.kr/boardCnts/list.do?type=default&page=1&m=0201&s=dsmhs&boardID=54793");
  const $: any = cheerio.load(data);
  for(let i=0; i<6; i++) {
    const boardSeq: string = $(".link")[i].childNodes[1].attribs.onclick.toString().match(/[0-9]+/g)[1];
    await testFunc(`${TEST_URL}/boardCnts/view.do?boardID=54793&boardSeq=${boardSeq}&lev=0&searchType=null&statusYN=W&page=3&pSize=11&s=dsmhs&m=0201&opType=N`);  
  }
}

testRun()
.then(() => console.log(crawlData))
.catch(console.error);