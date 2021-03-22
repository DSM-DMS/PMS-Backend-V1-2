import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("club")
export class Club {
  @PrimaryGeneratedColumn()
  club_id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column()
  profile_image: string;

  @Column()
  description: string;
}