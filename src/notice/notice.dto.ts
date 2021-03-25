import { Comment } from "./comment/comment.entity";

export class NoticeInfoResObj {
  "upload-date": Date;
  title: string;
  body: string;
  attach: string[];
  comment: Comment[];
}