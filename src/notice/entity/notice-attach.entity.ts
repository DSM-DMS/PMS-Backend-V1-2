import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Notice } from "./notice.entity";

@Entity("notice_attach")
export class NoticeAttach {
  @PrimaryColumn({ type: "varchar", length: 512 })
  file_name: string;

  @ManyToOne(type => Notice, notice => notice.attach) 
  @JoinColumn({ name: "notice_id" })
  notice: Notice;
}