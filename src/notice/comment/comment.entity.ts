import { ParentEntity } from "../../shared/parent/entity/parent.entity";
import { Parent } from "../../shared/parent/interface/entity/parent.entity.interface";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notice } from "../entity/notice.entity";

@Entity("comment")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  "upload-date": Date;

  @Column()
  body: string;

  @Column()
  depth: number;

  @ManyToOne((type) => ParentEntity)
  @JoinColumn({ name: "user_email" })
  user: Parent;

  @OneToMany((type) => Comment, (comment) => comment.parent_comment)
  comment: Comment[];

  @ManyToOne((type) => Comment, (comment) => comment.comment)
  @JoinColumn({ name: "comment_id" })
  parent_comment: Comment;

  @ManyToOne((type) => Notice, (notice) => notice.comment)
  @JoinColumn({ name: "notice_id" })
  notice: Notice;
}
