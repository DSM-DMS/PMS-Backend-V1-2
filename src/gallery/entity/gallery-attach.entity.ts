import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Gallery } from "./gallery.entity";

@Entity("gallery_attach")
export class GalleryAttach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_name: string;

  @ManyToOne((type) => Gallery, (gallery) => gallery.attach)
  @JoinColumn({ name: "gallery_id" })
  gallery: Gallery;
}
