import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ClubMember } from "../entity/club.member.entity";

@Entity("user")
export class User {
  @PrimaryColumn()
  id: number

  @Column({ type: "varchar", length: 15 })
  name: string;

  @OneToMany(type => ClubMember, member => member.club)
  club_member: ClubMember[];
}