import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClubMember } from "./club.member.entity";

@Entity("club")
export class Club {
  @PrimaryGeneratedColumn()
  club_id: number;

  @Column({ type: "varchar", length: 45, name: "name" })
  title: string;

  @Column({ name: "profile_image" })
  uri: string;

  @Column({ name: "description" })
  explanation: string;

  @OneToMany(type => ClubMember, member => member.club)
  club_member: ClubMember[];
}