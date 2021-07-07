import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("gallery")
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  "upload-date": Date;

  @Column()
  title: string;

  @Column("text")
  body: string;
}
