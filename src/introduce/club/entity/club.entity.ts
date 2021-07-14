import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClubMember } from "./club.member.entity";

@Entity("club")
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45, name: "name" })
  title: string;

  @Column({ name: "profile_image" })
  url: string;

  @Column({ name: "description" })
  explanation: string;

  @OneToMany((type) => ClubMember, (member) => member.club)
  club_member: ClubMember[];
}
