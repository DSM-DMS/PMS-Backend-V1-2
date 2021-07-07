import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GalleryAttach } from "./gallery-attach.entity";

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

  @OneToMany((type) => GalleryAttach, (attach) => attach.gallery)
  attach: GalleryAttach[];

  thumbnail: GalleryAttach;
}
