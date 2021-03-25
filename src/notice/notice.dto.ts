import { Comment } from "./comment/comment.entity";

export class NoticeInfoResObj {
  "update-date": Date;
  title: string;
  body: string;
  attach: string[];
  comment: Comment[];
}