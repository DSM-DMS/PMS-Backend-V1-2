import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}