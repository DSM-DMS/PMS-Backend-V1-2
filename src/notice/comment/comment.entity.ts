import { Parent } from "../../shared/parent/parent.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Notice } from "../entity/notice.entity";

@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date"})
  "upload-date": Date;

  @Column()
  body: string;

  @ManyToOne(type => Parent)
  @JoinColumn({ name: "user_email" })
  parent: Parent;

  @OneToMany(type => Comment, comment => comment.parent_comment)
  comment: Comment[];

  @ManyToOne(type => Comment, comment => comment.comment)
  @JoinColumn({ name: "comment_id" })
  parent_comment: Comment;

  @ManyToOne(type => Notice, notice => notice.comment)
  @JoinColumn({ name: "notice_id" })
  notice: Notice;

  name: string;
}