import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../comment/comment.entity";
import { NoticeAttach } from "./notice-attach.entity";

@Entity("notice")
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  "upload-date": Date;

  @Column()
  title: string;

  @Column("text")
  body: string;

  @OneToMany((type) => Comment, (comment) => comment.notice)
  comment: Comment[];

  @OneToMany((type) => NoticeAttach, (attach) => attach.notice)
  attach: NoticeAttach[];
}
