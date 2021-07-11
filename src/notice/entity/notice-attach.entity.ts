import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notice } from "./notice.entity";

@Entity("notice_attach")
export class NoticeAttach {
  @PrimaryGeneratedColumn()
  attach_id: number;

  @Column({ type: "varchar", length: 512, name: "file_name" })
  download: string;

  @Column({ name: "attach_name" })
  name: string;

  @ManyToOne((type) => Notice, (notice) => notice.attach)
  @JoinColumn({ name: "notice_id" })
  notice: Notice;
}
